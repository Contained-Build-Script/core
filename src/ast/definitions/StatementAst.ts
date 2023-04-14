import type { SimpleStatements } from "../types/SimpleStatements";
import { KeywordType } from "../../lexer/enums/KeywordType";
import { ContextType } from "../../lexer/enums/ContextType";
import { TokenType } from "../../lexer/enums/TokenType";
import { NodeType } from "../enums/NodeType";

export const StatementAst: Partial<Record<NodeType, SimpleStatements>> = {
    [NodeType.RETURN_STATEMENT]: [
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.RETURN },
        { optional: true, ref: NodeType.ANY_EXPRESSION },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.LINE_END }
    ],

    [NodeType.BREAK_STATEMENT]: [
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.BREAK },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.LINE_END }
    ],

    [NodeType.CONTINUE_STATEMENT]: [
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.CONTINUE },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.LINE_END }
    ],

    [NodeType.THROW_STATEMENT]: [
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.THROW },
        { ref: NodeType.ANY_EXPRESSION },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.LINE_END }
    ]
};