import type { WikiDirectory } from "./interfaces/WikiDirectory";
import type { WikiPage } from "./interfaces/WikiPage";
// @ts-ignore
import { readFileSync, readdirSync, statSync, mkdirSync, existsSync, writeFileSync } from "fs";
import { join, basename } from "path";

class GenerateWiki {

    private readonly basePath: string;
    
    private readonly targetPath: string;

    private readonly nav: string[];

    private readonly pages: Array<WikiPage | WikiDirectory>;

    // @ts-ignore
    private readonly template: string;
    
    constructor(basePath: string, targetPath: string, templatePath: string) {
        this.basePath = basePath;
        this.targetPath = targetPath;
        this.nav = [];
        this.pages = this.exploreDirectory();
        this.template = readFileSync(templatePath, "utf8").replace(/{{nav}}/g, this.nav.join(""));
    }

    public build(): void {
        this.buildRecursively({
            path: ".",
            pages: this.pages
        });
    }

    private buildRecursively({ path, pages }: WikiDirectory, depth = 0): void {
        const outputPath = join(this.targetPath, path);

        // First create the directory to avoid errors
        if (!existsSync(outputPath)) {
            mkdirSync(outputPath, { recursive: true });
        }

        pages.forEach((page) => {
            if ("pages" in page) {
                this.buildRecursively(page, depth + 1);
            } else {
                const fullPath = join(outputPath, page.fileName);

                console.log(`Building ${fullPath}`);

                writeFileSync(fullPath,this.template.replace(/{{content}}/g, page.content)
                    .replace(/{{title}}/g, page.titles[0])
                    .replace(/{{depth}}/g, "../".repeat(depth)));
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
                stat: statSync(filePath)
            };
        }).sort((a, b) => +a.stat.isDirectory() - +b.stat.isDirectory()).map(({ fileName, filePath, stat }) => {

            console.info(`Exploring ${filePath}`);
            this.nav.push("<details>");

            if (stat.isDirectory()) {
                this.nav.push(`<summary><b>${fileName}</b></summary>`);

                // Has to be done in this order, otherwise the nav items are misaligned
                const fullPath = join(path, fileName);
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

                this.nav.push(`<summary>${this.createUrl(targetPath, titles[0])}</summary>`);
                this.nav.push(...titles.slice(1).map((title) => this.createUrl(targetPath, title)));
                this.nav.push("</details>");

                return {
                    fileName: renamedFile,
                    titles,
                    content
                };
            }
        }).filter((page) => page);
    }

    private createUrl(filePath: string, title: string): string {
        return `<a href="${filePath}#${basename(filePath, ".html").toLowerCase().replace(/\s+/g, "-")}-${title.toLowerCase().replace(/\s+/g, "-")}">${title}</a>`;
    }
}

const truncatedArgs = process.argv.slice(2);

if (truncatedArgs.length == 3 && truncatedArgs.every(existsSync)) {
    new GenerateWiki(...<[string, string, string]>truncatedArgs).build();
} else if (truncatedArgs[0] == "--help" || truncatedArgs[0] == "-h" || truncatedArgs[0] == "/?") {
    console.info("Usage: generate-wiki <wiki path> <target path> <template path>");
} else {
    console.error("Invalid arguments, expecting 3 paths: wiki path, target path, template path");
}