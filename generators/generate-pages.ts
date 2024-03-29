import type { WikiDirectory } from "./interfaces/WikiDirectory";
import type { WikiPage } from "./interfaces/WikiPage";
import { readFileSync, readdirSync, statSync, mkdirSync, existsSync, writeFileSync, copyFileSync } from "fs";
import { join, basename, extname } from "path";

class GeneratePages {

    private readonly basePath: string;
    
    private readonly iconPath: string;

    private readonly nav: string[];

    private readonly pages: Array<WikiPage | WikiDirectory>;

    private readonly template: string;
    
    constructor(basePath: string, templatePath: string, iconPath: string) {
        this.basePath = basePath;
        this.iconPath = iconPath;
        this.nav = [];
        this.pages = this.exploreDirectory();
        this.template = readFileSync(templatePath, "utf8").replace(/{{nav}}/g, this.nav.join(""));
    }

    public build(targetPath: string): void {
        const favIconPath = join(this.basePath, "favicon.ico");

        this.buildRecursively(targetPath, {
            path: ".",
            pages: this.pages
        });

        console.info("Copying additional resources...");

        if (existsSync(favIconPath) && existsSync(this.iconPath)) {
            copyFileSync(favIconPath, join(targetPath, "favicon.ico"));
            copyFileSync(this.iconPath, join(targetPath, "cbs.png"));
        } else {
            throw new Error("Favicon or CBS image not found");
        }
    }

    private buildRecursively(targetPath: string, { path, pages }: WikiDirectory, depth = 0): void {
        const outputPath = join(targetPath, path);
        const files = <WikiPage[]>pages.filter((page) => "fileName" in page);

        // First create the directory to avoid errors
        if (!existsSync(outputPath)) {
            mkdirSync(outputPath, { recursive: true });
        }

        if (!files.some(({ fileName }) => fileName == "index.html")) {
            const indexPath = join(outputPath, "index.html");

            if (files.some(({ fileName }) => fileName == "Home.html")) {
                writeFileSync(indexPath, this.buildPage(`<script>
                    location.href = location.href.split("/").slice(0, -1).join("/") + "/Home.html";
                </script>`, "Home", depth));
            } else {
                writeFileSync(indexPath, this.buildPage("", "Index", depth));
            }
        }

        pages.forEach((page) => {
            if ("pages" in page) {
                this.buildRecursively(targetPath, page, depth + 1);
            } else {
                const fullPath = join(outputPath, page.fileName);

                console.info(`Building ${fullPath}`);

                writeFileSync(fullPath, this.buildPage(page.content, page.titles[0], depth));
            }
        });
    }

    private exploreDirectory(path = "."): Array<WikiPage | WikiDirectory> {
        const explorePath = join(this.basePath, path);

        return readdirSync(explorePath).map((fileName) => {
            const filePath = join(explorePath, fileName);

            return {
                fileName,
                filePath,
                isDir: statSync(filePath).isDirectory()
            };
        }).filter(({
            fileName,
            isDir
        }) => isDir || extname(fileName) == ".md").sort((a, b) => +a.isDir - +b.isDir).map(({
            fileName,
            filePath,
            isDir
        }) => {
            console.info(`Exploring ${filePath}`);
            this.nav.push("<details>");

            if (isDir) {
                const fullPath = join(path, fileName);

                // Has to be done in this order, otherwise the nav items are misaligned
                this.nav.push(`<summary><b path="${fullPath}">${fileName}</b></summary>`);
                
                const pages = this.exploreDirectory(fullPath);

                this.nav.push("</details>");

                return {
                    path: fullPath,
                    pages
                };
            } else {
                const renamedFile = fileName.replace(/\.md$/, ".html");
                const targetPath = join(path, renamedFile);
                const content = readFileSync(filePath, "utf8").replace(/(\[[^\]]+?]\([^)]*?([^\/)]+?))\.md(?:#(.*?))?(?=\s*\))/g, (_, url, file, hash) => {
                    return `${url}.html${hash ? `#${file.toLowerCase().replace(/\s+/g, "-")}-${hash}` : ""}`;
                }).replace(/```ts(?=(?:\s|.)*?```)/g, "```cbs");
                const titles = [...content.matchAll(/^#+\s(.*?)$/gm)].map(([_, title]) => title);

                if (titles.length) {
                    this.nav.push(`<summary>${this.createUrl(targetPath, titles[0])}</summary>`);
                    this.nav.push(...titles.slice(1).map((title) => this.createUrl(targetPath, title)));
                    this.nav.push("</details>");
                } else {
                    this.nav.splice(-1, 1);
                }

                return {
                    fileName: renamedFile,
                    titles,
                    content
                };
            }
        }).filter((page) => page);
    }

    private buildPage(content: string, title: string, depth: number): string {
        return this.template.replace(/{{content}}/g, content).replace(/{{title}}/g, title).replace(/{{depth}}/g, "../".repeat(depth));
    }

    private createUrl(filePath: string, title: string): string {
        return `<a href="${filePath}#${basename(filePath, ".html").toLowerCase().replace(/\s+/g, "-")}-${title.toLowerCase().replace(/\s+/g, "-")}">${title}</a>`;
    }
}

const truncatedArgs = process.argv.slice(2);

if (truncatedArgs.length == 4 && truncatedArgs.every(existsSync)) {
    new GeneratePages(truncatedArgs[0], truncatedArgs[1], truncatedArgs[2]).build(truncatedArgs[3]);
} else if (truncatedArgs[0] == "--help" || truncatedArgs[0] == "-h" || truncatedArgs[0] == "/?") {
    console.info("Usage: generate-wiki <wiki path> <template path> <icon path> <target path>");
} else {
    console.error("Invalid arguments, expecting 3 paths: wiki path, template path, icon path, target path");
}