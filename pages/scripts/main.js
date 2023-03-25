// @ts-check
/// <reference path="index.d.ts" />

/**
 * @param {HTMLElement?} element
 * @returns {void}
 */
function recursiveDetailOpen(element) {
    if (element && element.tagName == "DETAILS") {
        // @ts-ignore
        element.open = true;

        recursiveDetailOpen(element.parentElement);
    }
}

/**
 * @returns {void}
 */
function highlightCurrent() {
    const location = document.querySelector(`a[href$="${window.location.hash}"]`) ?? document.querySelector(`a[href$="${
        decodeURI(window.location.pathname.match(/[^\/]+?(?=\..*?$)/)?.[0] ?? "").replace(/\s+/g, "-").toLowerCase()
    }"]`);
    
    [...document.getElementsByClassName("highlight")].forEach((element) => element.classList.remove("highlight"));

    if (location) {
        location.classList.add("highlight");

        recursiveDetailOpen(location.parentElement?.tagName == "SUMMARY" ? location.parentElement.parentElement : location.parentElement);
    }
}

/**
 * @param {string} html
 * @returns {string}
 */
 function restoreSymbols(html) {
    return html.replace(/(&(?:\w+|\d+);)/g, (entity) => {
        const textarea = document.createElement("textarea");

        textarea.innerHTML = entity;

        // Small loophole to force entities to be decoded (because HTML refuses to decode them)
        return textarea.value;
    });
}

const menu = document.createElement("span");
const menuBar = document.createElement("div");
const content = document.getElementById("content");

menu.innerHTML = "<i class=\"fa-solid fa-bars\"></i>";
menuBar.id = "menu-bar";

menu.classList.add("menu");
menu.addEventListener("click", () => {
    document.getElementById("nav")?.classList.toggle("open");
    document.getElementById("menu-bar")?.classList.toggle("open");
});
menuBar.appendChild(menu);
document.body.appendChild(menuBar);

window.addEventListener("hashchange", highlightCurrent);


if (content) {
    window.addEventListener("load", () => {
        content.style.display = "block";

        highlightCurrent();
    });

    content.innerHTML = restoreSymbols(window.marked.parse(content.innerHTML));

    for (let i = 1; i <= 3; i++) {
        [...content.getElementsByTagName(`h${i}`)].forEach((element) => {
            const link = document.createElement("span");
    
            link.innerHTML = "<i class=\"fa-solid fa-link\"></i>";
            link.classList.add("link");
            element.addEventListener("click", () => location.href = `#${element.id}`);
            element.appendChild(link);

            if (element.id) {
                element.id = `${document.title.split(" - ")[1].toLowerCase()}-${element.id}`;
            }
        });
    }

    [...content.getElementsByClassName("language-cbs")].forEach((element) => {
        try {
            element.innerHTML = new CBSHighlighter(restoreSymbols(element.innerHTML)).parse();
        } catch (error) {
            console.error(error);
        }
    });
}