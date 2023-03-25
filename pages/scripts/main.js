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
        element.getElementsByTagName("summary")[0].classList.add("highlight");

        recursiveDetailOpen(element.parentElement);
    }
}

/**
 * @returns {void}
 */
function highlightCurrent() {
    let location;

    if (window.location.pathname.endsWith(".html") && !window.location.pathname.endsWith("/index.html")) {
        const decoded = decodeURI(window.location.href);

        location = document.querySelector(`a[href="${decoded}"]`) ?? document.querySelector(`a[href^="${decoded.split("#")[0]}"]`);
    } else {
        location = document.querySelector(`b[path="${decodeURI(window.location.href).split(/\/index\.html#.*?$/)[0]}"]`);
    }

    [...document.getElementsByClassName("highlight")].forEach((element) => element.classList.remove("highlight"));

    if (location) {
        if (location.parentElement?.tagName == "SUMMARY") {
            location.parentElement.classList.add("highlight");

            recursiveDetailOpen(location.parentElement.parentElement);
        } else {
            location.classList.add("highlight");

            recursiveDetailOpen(location.parentElement);
        }
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

const nav = document.getElementById("nav");
const menu = document.createElement("span");
const menuBar = document.createElement("div");
const content = document.getElementById("content");
const baseURL = `${location.protocol}//${location.host}${location.pathname.split(/\/+/).slice(0, 2).join("/")}`;

if (!nav || !content) {
    throw new Error("Missing elements");
}

menuBar.id = "menu-bar";
menu.innerHTML = "<i class=\"fa-solid fa-bars\"></i>";
content.innerHTML = restoreSymbols(window.marked.parse(content.innerHTML));

menu.classList.add("menu");
menuBar.appendChild(menu);
document.body.appendChild(menuBar);

[...nav.getElementsByTagName("a")].forEach((element) => element.href = `${baseURL}/${element.getAttribute("href")?.replace(/\\/g, "/")}`);
[...nav.querySelectorAll("b[path]")].forEach((element) => element.setAttribute("path", `${baseURL}/${element.getAttribute("path")?.replace(/\\/g, "/")}/`));
[...content.getElementsByClassName("language-cbs")].forEach((element) => {
    try {
        element.innerHTML = new CBSHighlighter(restoreSymbols(element.innerHTML)).parse();
    } catch (error) {
        console.error(error);
    }
});

window.addEventListener("hashchange", highlightCurrent);
window.addEventListener("load", () => {
    content.style.display = "block";

    highlightCurrent();
});
menu.addEventListener("click", () => {
    nav?.classList.toggle("open");
    menuBar.classList.toggle("open");
});

for (let i = 1; i <= 3; i++) {
    [...content.getElementsByTagName(`h${i}`)].forEach((element) => {
        const link = document.createElement("span");

        link.innerHTML = "<i class=\"fa-solid fa-link\"></i>";
        link.classList.add("link");
        element.addEventListener("click", () => location.href = `#${element.id}`);
        element.appendChild(link);

        if (element.id) {
            element.id = `${document.title.split(" - ").slice(1).join(" - ").toLowerCase()}-${element.id}`;
        }
    });
}

if (content.innerHTML == "") {
    nav.style.left = "0";
    nav.style.width = "100vw";
} else if (location.hash.slice(1) == content.getElementsByTagName("h1")[0].id) {
    location.href = location.href.split("#")[0];
}