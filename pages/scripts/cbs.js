// @ts-check
/// <reference path="./index.d.ts" />

class CBSHighlighter {

    /**
     * TODO: fix the variable regex
     * @private
     * @readonly
     */
    static parsers = [
        {
            type: "comment",
            matcher: /\/\/.*$|\/\*(\s|.)*?\*\//
        },
        {
            type: "text",
            matcher: /=>|![&|]{2}|[+\-*]{2}|[*+\-/%!=]=?|[\^&|]{1,2}|~[&|]?|([<>])(?:\1|=)?|[;,:]/
        },
        {
            type: "variable",
            matcher: /#(?!\d)[^\s[\]{}()\\\/+\-%=!*^&|<>,.`"';:?]+|#\*/
        },
        {
            type: "string",
            matcher: /(["'])(.*?(?<!\\)(?:\\\\)*|)\1|`((?:.|\s)*?(?<!\\)(?:\\\\)*|)`/
        },
        {
            type: "number",
            matcher: /(?:-)?(?:0x[\da-f]+|0b[01]+|(?:(?:\d+)?\.)?\d+(?:e[-+]?\d+)?)/
        },
        {
            type: "constant",
            matcher: [
                "true",
                "TRUE",
                "false",
                "FALSE",
                "null",
                "NULL",
                "const",
                "function"
            ]
        },
        {
            type: "type",
            matcher: [
                "int",
                "bool",
                "float",
                "string",
                "command",
                "difference"
            ]
        },
        {
            type: "keyword",
            matcher: [
                "if",
                "define",
                "else",
                "foreach",
                "for",
                "while",
                "in",
                "of",
                "switch",
                "case",
                "default",
                "break",
                "continue",
                "return",
                "with",
                "to",
                "throw",
                "try",
                "catch"
            ]
        },
        {
            type: "keyword",
            matcher: /[(){}\[\]]/
        },
        {
            type: "function",
            matcher: /(?!\d)[^\s[\]{}()\\/+\-%=!*^&|<>,.`"';:?]+(?=\()/
        }
    ].map(({ type, matcher }) => ({
        type,
        matcher: (() => {
            if (typeof matcher == "string") {
                return new RegExp(`${matcher}(?![^\\s[\\]{}()\\\\/+\\-%=!*^&|<>,.\`"';:?])\\s*`, "my");
            } else if (Array.isArray(matcher)) {
                return new RegExp(`(?:${matcher.join("|")})(?![^\\s[\\]{}()\\\\/+\\-%=!*^&|<>,.\`"';:?])\\s*`, "my");
            } else {
                return new RegExp(`(?:${matcher.source})\\s*`, "my" + matcher.flags.replace(/[myg]/g, ""));
            }
        })()
    }));

    /**
     * @private
     * @readonly
     * @type {string}
     */
     baseCode;

    /**
     * @param {string} code 
     */
    constructor(code) {
        this.baseCode = code;
    }

    /**
     * @returns {string}
     */
    parse() {
        let parsedCode = this.baseCode;

        for (let i = 0; i < parsedCode.length;) {
            const originalI = i;

            for (const { matcher, type } of CBSHighlighter.parsers) {
                matcher.lastIndex = i;
                const match = parsedCode.match(matcher);

                if (match && match[0].length) {
                    const highlight = `<span style="color: var(--${type})">${match[0]}</span>`;
                    const matchedOffset = i + match[0].length;

                    parsedCode = parsedCode.slice(0, i) + highlight + parsedCode.slice(matchedOffset);
                    matcher.lastIndex = i += highlight.length;

                    break;
                }
            }

            if (originalI == i) {
                throw new Error(`Failed to parse code at "${parsedCode.slice(i, i + 30)}..."`);
            }
        }

        return parsedCode;
    }
}