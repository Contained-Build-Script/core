import type { SimpleStatements } from "../types/SimpleStatements";
import { ContextType } from "../../lexer/enums/ContextType";
import { TokenType } from "../../lexer/enums/TokenType";
import { ValueType } from "../../lexer/enums/ValueType";
import { NodeType } from "../enums/NodeType";

export const ExpressionAst: Partial<Record<NodeType, SimpleStatements>> = {
    [NodeType.NON_REPEATABLE_EXPRESSION]: { ref: [
        NodeType.ENCAPSULATED_EXPRESSION,
        NodeType.LITERAL,
        NodeType.VARIABLE_ASSIGNMENT,
        NodeType.POST_UPDATE_EXPRESSION,
        NodeType.FUNCTION_CALL,
        NodeType.IDENTIFIER,
        NodeType.PRE_UPDATE_EXPRESSION,
        NodeType.MUTATION_EXPRESSION
    ] },

    [NodeType.ANY_EXPRESSION]: { ref: [
        NodeType.EXPRESSION,
        NodeType.NON_REPEATABLE_EXPRESSION
    ] },

    [NodeType.EXPRESSION]: [
        { ref: NodeType.NON_REPEATABLE_EXPRESSION },
        { tokenType: TokenType.OPERATOR },
        { ref: NodeType.ANY_EXPRESSION }
    ],

    [NodeType.ENCAPSULATED_EXPRESSION]: [
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ENCAPSULATION_START },
        { ref: NodeType.ANY_EXPRESSION },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ENCAPSULATION_END }
    ],

    [NodeType.MUTATION_EXPRESSION]: [
        { tokenType: TokenType.MUTATION_OPERATOR },
        { ref: NodeType.IDENTIFIER }
    ],

    [NodeType.PRE_UPDATE_EXPRESSION]: [
        { tokenType: TokenType.UPDATE_OPERATOR },
        { ref: NodeType.IDENTIFIER }
    ],

    [NodeType.POST_UPDATE_EXPRESSION]: [
        { ref: NodeType.IDENTIFIER },
        { tokenType: TokenType.UPDATE_OPERATOR }
    ],

    [NodeType.VARIABLE_ASSIGNMENT]: [
        { ref: NodeType.IDENTIFIER },
        { tokenType: TokenType.ASSIGN_OPERATOR },
        { ref: NodeType.ANY_EXPRESSION }
    ],

    [NodeType.FUNCTION_CALL_ARGUMENT]: [
        { ref: NodeType.ANY_EXPRESSION },
        { optionalStatements: [
            { tokenType: TokenType.CONTEXT, dataType: ContextType.SEPARATOR },
            { ref: NodeType.FUNCTION_CALL_ARGUMENT }
        ] }
    ],

    [NodeType.FUNCTION_CALL]: [
        { ref: NodeType.IDENTIFIER },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ENCAPSULATION_START },
        { optional: true, ref: NodeType.FUNCTION_CALL_ARGUMENT },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ENCAPSULATION_END }
    ],

    [NodeType.ARRAY_ACCESSOR]: [
        { ref: [
            NodeType.EXPRESSION,
            NodeType.LITERAL,
            NodeType.VARIABLE_ASSIGNMENT,
            NodeType.FUNCTION_CALL,
            NodeType.IDENTIFIER,
        ] },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ARRAY_START },
        { tokenType: TokenType.VALUE, dataType: ValueType.NUMBER },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ARRAY_END }
    ]
};