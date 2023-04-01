import type { SimpleTokenCollection } from "../types/SimpleTokenCollection";
import { VariableInfoType } from "../enums/VariableInfoType";
import { OperatorType } from "../enums/OperatorType";
import { ContextType } from "../enums/ContextType";
import { KeywordType } from "../enums/KeywordType";
import { TokenType } from "../enums/TokenType";
import { ValueType } from "../enums/ValueType";
import { VariableType } from "../enums/VariableType";

export const LEXER_TOKEN_ORDER: Array<SimpleTokenCollection<TokenType>> = [
    {
        tokenType: TokenType.OPERATOR,
        tokens: [
            [OperatorType.LEFT_SHIFT, "<<"],
            [OperatorType.LESS_THAN_OR_EQUAL, "<="],
            [OperatorType.LESS_THAN, "<"],
            [OperatorType.RIGHT_SHIFT, ">>"],
            [OperatorType.GREATER_THAN_OR_EQUAL, ">="],
            [OperatorType.GREATER_THAN, ">"],
            [OperatorType.INCREMENT, "++"],
            [OperatorType.ADDITION, "+"],
            [OperatorType.DECREMENT, "--"],
            [OperatorType.SUBTRACTION, "-"],
            [OperatorType.EXPONENTIATION, "**"],
            [OperatorType.MULTIPLICATION, "*"],
            [OperatorType.DIVISION, "/"],
            [OperatorType.MODULO, "%"],
            [OperatorType.EQUAL, "=="],
            [OperatorType.ASSIGNMENT, "="],
            [OperatorType.NOT_EQUAL, "!="],
            [OperatorType.NAND, "!&&"],
            [OperatorType.NOR, "!||"],
            [OperatorType.NOT, "!"],
            [OperatorType.AND, "&&"],
            [OperatorType.AND_BITWISE, "&"],
            [OperatorType.OR, "||"],
            [OperatorType.OR_BITWISE, "|"],
            [OperatorType.XOR, "^^"],
            [OperatorType.XOR_BITWISE, "^"],
            [OperatorType.NAND_BITWISE, "~&"],
            [OperatorType.NOR_BITWISE, "~|"],
            [OperatorType.NOT_BITWISE, "~"],
            [OperatorType.CASE_OPEN, ":"],
            [OperatorType.COMMA, ","],
            [OperatorType.LINE_END, ";"]
        ]
    },
    {
        // NOTE: To optimize the lexer, this should be placed after all symbol tokens as it has no overlap
        tokenType: TokenType.VARIABLE,
        // To be populated later to make sure that all tokens are dynamically blacklisted from being used as a variable name
        tokens: []
    },
    {
        tokenType: TokenType.CONTEXT,
        tokens: [
            [ContextType.ENCAPSULATION_START, "("],
            [ContextType.ENCAPSULATION_END, ")"],
            [ContextType.ARRAY_START, "["],
            [ContextType.ARRAY_END, "]"],
            [ContextType.SCOPE_START, "{"],
            [ContextType.SCOPE_END, "}"]
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
            [KeywordType.IN, "in"],
            [KeywordType.OF, "of"],
            [KeywordType.SWITCH, "switch"],
            [KeywordType.CASE, "case"],
            [KeywordType.DEFAULT, "default"],
            [KeywordType.BREAK, "break"],
            [KeywordType.CONTINUE, "continue"],
            [KeywordType.RETURN, "return"],
            [KeywordType.DEFINE, "define"],
            [KeywordType.THROW, "throw"],
            [KeywordType.TRY, "try"],
            [KeywordType.CATCH, "catch"],
            [KeywordType.WITH, "with"],
            [KeywordType.TO, "to"]
        ]
    },
    {
        tokenType: TokenType.VARIABLE_INFO,
        tokens: [
            [VariableInfoType.CONSTANT, "const"],
            [VariableInfoType.INT, "int"],
            [VariableInfoType.NULL, "null"],
            [VariableInfoType.FLOAT, "float"],
            [VariableInfoType.STRING, "string"],
            [VariableInfoType.BOOLEAN, "bool"],
            [VariableInfoType.COMMAND, "command"],
            [VariableInfoType.FUNCTION, "function"],
            [VariableInfoType.DIFFERENCE, "difference"]
        ]
    },
    {
        // NOTE: Always put this last, no other tokens have any overlap with this and you want to make sure that it uses regexes as little as possible
        tokenType: TokenType.VALUE,
        tokens: [
            [ValueType.NUMBER, /(?:-)?(?:0x[\da-f]+|0b[01]+|(?:(?:\d+)?\.)?\d+(?:e[-+]?\d+)?)/],
            [ValueType.NULL, ["null", "NULL"]],
            [ValueType.STRING, /(["'])(.*?(?<!\\)(?:\\\\)*|)\1|`((?:.|\s)*?(?<!\\)(?:\\\\)*|)`/],
            [ValueType.BOOLEAN, ["true", "false", "TRUE", "FALSE"]]
        ]
    },
];

LEXER_TOKEN_ORDER[0].tokens.push([
    VariableType.VARIABLE,
    new RegExp(`(?!\\d|^(${LEXER_TOKEN_ORDER.reduce((words, { tokens }) => {
        tokens.forEach(([_, token]) => {
            const regex = /^\w+$/m;

            if (typeof token == "string" && regex.test(token)) {
                words.push(token);
            } else if (Array.isArray(token)) {
                words.push(...token.filter((word) => regex.test(word)));
            }
        });

        return words;
    }, <string[]>[]).join("|")}([\\s[\\]{}()\\/\\\\+\\-%=!*^&|<>,.\`"';:?]|$)))[^\\s[\\]{}()\\/\\\\+\\-%=!*^&|<>,.\`"';:?]+`)
])