import type { SimpleTokenCollections } from "./types/SimpleTokenCollections";
import type { SimpleTokenCollection } from "./types/SimpleTokenCollection";
import { MutationOperatorType } from "./enums/MutationOperatorType";
import { AssignOperatorType } from "./enums/AssignOperatorType";
import { UpdateOperatorType } from "./enums/UpdateOperatorType";
import { VariableType } from "./enums/VariableType";
import { OperatorType } from "./enums/OperatorType";
import { ContextType } from "./enums/ContextType";
import { KeywordType } from "./enums/KeywordType";
import { TokenType } from "./enums/TokenType";
import { ValueType } from "./enums/ValueType";

export const LEXER_TOKEN_ORDER: SimpleTokenCollections = [
    {
        tokenType: TokenType.UPDATE_OPERATOR,
        tokens: [
            [UpdateOperatorType.INCREMENT, "++"],
            [UpdateOperatorType.DECREMENT, "--"]
        ]
    },
    {
        tokenType: TokenType.ASSIGN_OPERATOR,
        tokens: [
            [AssignOperatorType.ADDITION, "+="],
            [AssignOperatorType.SUBTRACTION, "-="],
            [AssignOperatorType.MULTIPLICATION, "*="],
            [AssignOperatorType.DIVISION, "/="],
            [AssignOperatorType.MODULO, "%="],
            [AssignOperatorType.EXPONENTIATION, "**="],
            [AssignOperatorType.AND_BITWISE, "&="],
            [AssignOperatorType.OR_BITWISE, "|="],
            [AssignOperatorType.XOR_BITWISE, "^="],
            [AssignOperatorType.NAND_BITWISE, "~&="],
            [AssignOperatorType.NOR_BITWISE, "~|="],
            [AssignOperatorType.LEFT_SHIFT, "<<="],
            [AssignOperatorType.RIGHT_SHIFT, ">>="]
        ]
    },
    {
        tokenType: TokenType.CONTEXT,
        tokens: [
            [ContextType.ENCAPSULATION_START, "("],
            [ContextType.ENCAPSULATION_END, ")"],
            [ContextType.ARRAY_START, "["],
            [ContextType.ARRAY_END, "]"],
            [ContextType.SCOPE_START, "{"],
            [ContextType.SCOPE_END, "}"],
            [ContextType.ARROW, "=>"],
            [ContextType.DIVIDER, ":"],
            [ContextType.SEPARATOR, ","],
            [ContextType.LINE_END, ";"],
            [ContextType.ELLIPSIS, "..."],
            [ContextType.NAVIGATOR, "."]
        ]
    },
    {
        tokenType: TokenType.OPERATOR,
        tokens: [
            [OperatorType.LEFT_SHIFT, "<<"],
            [OperatorType.LESS_THAN_OR_EQUAL, "<="],
            [OperatorType.LESS_THAN, "<"],
            [OperatorType.RIGHT_SHIFT, ">>"],
            [OperatorType.GREATER_THAN_OR_EQUAL, ">="],
            [OperatorType.GREATER_THAN, ">"],
            [OperatorType.ADDITION, "+"],
            [OperatorType.SUBTRACTION, "-"],
            [OperatorType.EXPONENTIATION, "**"],
            [OperatorType.MULTIPLICATION, "*"],
            [OperatorType.DIVISION, "/"],
            [OperatorType.MODULO, "%"],
            [OperatorType.EQUAL, "=="],
            [OperatorType.NOT_EQUAL, "!="],
            [OperatorType.NAND, "!&&"],
            [OperatorType.NOR, "!||"],
            [OperatorType.AND, "&&"],
            [OperatorType.AND_BITWISE, "&"],
            [OperatorType.OR, "||"],
            [OperatorType.OR_BITWISE, "|"],
            [OperatorType.XOR, "^^"],
            [OperatorType.XOR_BITWISE, "^"],
            [OperatorType.NAND_BITWISE, "~&"],
            [OperatorType.NOR_BITWISE, "~|"]
        ]
    },
    {
        tokenType: TokenType.ASSIGN_OPERATOR,
        tokens: [
            [AssignOperatorType.ASSIGNMENT, "="]
        ]
    },
    {
        tokenType: TokenType.MUTATION_OPERATOR,
        tokens: [
            [MutationOperatorType.NOT, "!"],
            [MutationOperatorType.NOT_BITWISE, "~"]
        ]
    },
    {
        tokenType: TokenType.VARIABLE,
        // To be populated later to make sure that all tokens are dynamically blacklisted from being used as a variable name
        tokens: []
    },
    {
        tokenType: TokenType.KEYWORD,
        tokens: [
            [KeywordType.IF, "if"],
            [KeywordType.ELSE, "else"],
            [KeywordType.FOREACH, "foreach"],
            [KeywordType.FOR, "for"],
            [KeywordType.WHILE, "while"],
            [KeywordType.INTERFACE, "interface"],
            [KeywordType.IN, "in"],
            [KeywordType.OF, "of"],
            [KeywordType.SWITCH, "switch"],
            [KeywordType.CASE, "case"],
            [KeywordType.DEFAULT, "default"],
            [KeywordType.BREAK, "break"],
            [KeywordType.CONTINUE, "continue"],
            [KeywordType.RETURN, "return"],
            [KeywordType.DEFINE, "def"],
            [KeywordType.THROW, "throw"],
            [KeywordType.TRY, "try"],
            [KeywordType.CATCH, "catch"],
            [KeywordType.WITH, "with"],
            [KeywordType.TO, "to"],
            [KeywordType.CONSTANT, "const"],
            [KeywordType.DELETE, "delete"],
            [KeywordType.NEW, "new"],
            [KeywordType.CLASS, "class"],
            [KeywordType.EXTENDS, "extends"],
            [KeywordType.IMPLEMENTS, "implements"],
            [KeywordType.ENUM, "enum"],
            [KeywordType.PUBLIC, "public"],
            [KeywordType.PRIVATE, "private"],
            [KeywordType.PROTECTED, "protected"],
            [KeywordType.STATIC, "static"],
            [KeywordType.ABSTRACT, "abstract"],
            [KeywordType.OVERRIDE, "override"]
        ]
    },
    {
        // NOTE: Always put this last, no other tokens have any overlap with this and you want to make sure that it uses regexes as little as possible
        tokenType: TokenType.VALUE,
        tokens: [
            [ValueType.NUMBER, /(?:-)?(?:0x[\da-f]+|0b[01]+|(?:(?:\d+)?\.)?\d+(?:e[-+]?\d+)?)/],
            [ValueType.NULL, /null|NULL/],
            [ValueType.STRING, /(["'])(.*?(?<!\\)(?:\\\\)*|)\1|`((?:.|\s)*?(?<!\\)(?:\\\\)*|)`/],
            [ValueType.BOOLEAN, /true|TRUE|false|FALSE/]
        ]
    },
];

(<SimpleTokenCollection<TokenType.VARIABLE>>LEXER_TOKEN_ORDER.find((collection) => collection.tokenType == TokenType.VARIABLE)).tokens.push([
    VariableType.IDENTIFIER,
    new RegExp(`(?!\\d|^(${[...LEXER_TOKEN_ORDER].reduce((words, { tokens }) => {
        Array(...tokens).filter(
            ([ _, token ]) => typeof token == "string" && /^\w+$/m.test(token)
        ).forEach(([ _, token ]) => words.push(<string>token));

        return words;
    }, [
        "null",
        "NULL",
        "true",
        "TRUE",
        "false",
        "FALSE"
    ]).join("|")})([\\s[\\]{}()\\/\\\\+\\-%=!*^&|<>,.\`"';:?]|$))[^\\s[\\]{}()\\/\\\\+\\-%=!*^&|<>,.\`"';:?]+`)
]);