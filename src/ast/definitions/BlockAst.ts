import type { SimpleStatements } from "../types/SimpleStatements";
import { KeywordType } from "../../lexer/enums/KeywordType";
import { ContextType } from "../../lexer/enums/ContextType";
import { TokenType } from "../../lexer/enums/TokenType";
import { NodeType } from "../enums/NodeType";

export const BlockAst: Partial<Record<NodeType, SimpleStatements>> = {
    [NodeType.BLOCK]: [
        { ref: [
            NodeType.SCOPE,
            NodeType.ANY_EXPRESSION,
            NodeType.VARIABLE_DEFINITION,
            NodeType.IF_STATEMENT,
            NodeType.FOR_STATEMENT,
            NodeType.WHILE_STATEMENT,
            NodeType.FOR_EACH_STATEMENT
        ] },
        { optional: true, ref: NodeType.BLOCK }
    ],

    [NodeType.BREAKABLE_BLOCK]: [
        { options: [
            { ref: NodeType.BLOCK },
            { tokenType: TokenType.KEYWORD, dataType: KeywordType.BREAK },
        ] },
        { optional: true, ref: NodeType.BREAKABLE_BLOCK }
    ],

    [NodeType.SCOPE]:  [
        { tokenType: TokenType.CONTEXT, dataType: ContextType.SCOPE_START },
        { ref: NodeType.BLOCK },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.SCOPE_END }
    ],

    [NodeType.ENCAPSULATED_SCOPE]: [
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ENCAPSULATION_START },
        { ref: NodeType.SCOPE },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ENCAPSULATION_END }
    ],

    [NodeType.BREAKABLE_SCOPE]: [
        { tokenType: TokenType.CONTEXT, dataType: ContextType.SCOPE_START },
        { ref: NodeType.BREAKABLE_BLOCK },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.SCOPE_END }
    ]
};