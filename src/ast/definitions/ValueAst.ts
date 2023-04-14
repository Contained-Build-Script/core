import type { SimpleStatements } from "../types/SimpleStatements";
import { VariableType } from "../../lexer/enums/VariableType";
import { KeywordType } from "../../lexer/enums/KeywordType";
import { ContextType } from "../../lexer/enums/ContextType";
import { TokenType } from "../../lexer/enums/TokenType";
import { NodeType } from "../enums/NodeType";

export const ValueAst: Partial<Record<NodeType, SimpleStatements>> = {
    [NodeType.ARRAY_LITERAL]: [
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ARRAY_START },
        { ref: NodeType.ARRAY_ENTRY_LITERAL },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ARRAY_END }
    ],

    [NodeType.ARRAY_ENTRY_LITERAL]: [
        { ref: NodeType.ANY_EXPRESSION },
        { optionalStatements: [
            { tokenType: TokenType.CONTEXT, dataType: ContextType.SEPARATOR },
            { ref: NodeType.ARRAY_ENTRY_LITERAL }
        ] }
    ],

    [NodeType.COMMAND_LITERAL]: [
        { ref: NodeType.ANY_EXPRESSION },
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.WITH },
        { ref: NodeType.ANY_EXPRESSION }
    ],

    [NodeType.DIFFERENCE_LITERAL]: [
        { ref: NodeType.ANY_EXPRESSION },
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.TO },
        { ref: NodeType.ANY_EXPRESSION }
    ],

    [NodeType.LITERAL]: { tokenType: TokenType.VALUE },

    [NodeType.IDENTIFIER]: { tokenType: TokenType.VARIABLE, dataType: VariableType.IDENTIFIER }
};