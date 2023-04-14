import type { SimpleStatements } from "../types/SimpleStatements";
import { AssignOperatorType } from "../../lexer/enums/AssignOperatorType";
import { VariableInfoType } from "../../lexer/enums/VariableInfoType";
import { KeywordType } from "../../lexer/enums/KeywordType";
import { ContextType } from "../../lexer/enums/ContextType";
import { TokenType } from "../../lexer/enums/TokenType";
import { NodeType } from "../enums/NodeType";

export const DefinitionAst: Partial<Record<NodeType, SimpleStatements>> = {
    [NodeType.TRANSFORMED_FUNCTION_DEFINITION_ARGUMENT]: [
        { options: [
            [
                { tokenType: TokenType.KEYWORD, dataType: KeywordType.DEFINE },
                { tokenType: TokenType.VARIABLE_INFO },
                { ref: NodeType.VARIABLE_ARRAY_DEFINITION },
                { tokenType: TokenType.CONTEXT, dataType: ContextType.ELLIPSIS },
                { ref: NodeType.IDENTIFIER }
            ],
            [
                { ref: NodeType.ASSIGNED_VARIABLE_DEFINITION },
                { optionalStatements: [
                    { tokenType: TokenType.CONTEXT, dataType: ContextType.SEPARATOR },
                    { optional: true, ref: NodeType.TRANSFORMED_FUNCTION_DEFINITION_ARGUMENT }
                ] }
            ]
        ] }
    ],

    [NodeType.FUNCTION_DEFINITION_ARGUMENT]: [
        { options: [
            { ref: NodeType.TRANSFORMED_FUNCTION_DEFINITION_ARGUMENT },
            [
                { ref: NodeType.VARIABLE_DEFINITION },
                { optionalStatements: [
                    { tokenType: TokenType.CONTEXT, dataType: ContextType.SEPARATOR },
                    { optional: true, ref: NodeType.FUNCTION_DEFINITION_ARGUMENT }
                ] }
            ]
        ] }
    ],

    [NodeType.FUNCTION_DEFINITION]: [
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.DEFINE },
        { tokenType: TokenType.VARIABLE_INFO, dataType: VariableInfoType.FUNCTION },
        { ref: NodeType.IDENTIFIER },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ENCAPSULATION_START },
        { ref: NodeType.FUNCTION_DEFINITION_ARGUMENT },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ENCAPSULATION_END },
        { optionalStatements: [
            { tokenType: TokenType.CONTEXT, dataType: ContextType.ARROW },
            { tokenType: TokenType.VARIABLE_INFO }
        ] },
        { ref: NodeType.SCOPE }
    ],

    [NodeType.VARIABLE_ARRAY_DEFINITION]: [
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ARRAY_START },
        { optional: true, ref: NodeType.ANY_EXPRESSION },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ARRAY_END },
        { optional: true, ref: NodeType.VARIABLE_ARRAY_DEFINITION }
    ],

    [NodeType.VARIABLE_DEFINITION]: [
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.DEFINE },
        { optional: true, tokenType: TokenType.KEYWORD, dataType: KeywordType.CONSTANT },
        { tokenType: TokenType.VARIABLE_INFO },
        { optional: true, ref: NodeType.VARIABLE_ARRAY_DEFINITION },
        { ref: NodeType.IDENTIFIER }
    ],

    [NodeType.ASSIGNED_VARIABLE_DEFINITION]: [
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.DEFINE },
        { optional: true, tokenType: TokenType.KEYWORD, dataType: KeywordType.CONSTANT },
        { tokenType: TokenType.VARIABLE_INFO },
        { optional: true, ref: NodeType.VARIABLE_ARRAY_DEFINITION },
        { ref: NodeType.IDENTIFIER },
        { optionalStatements: [
            { tokenType: TokenType.ASSIGN_OPERATOR, dataType: AssignOperatorType.ASSIGNMENT },
            { ref: NodeType.ANY_EXPRESSION }
        ] }
    ]
};