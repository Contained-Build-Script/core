import type { SimpleStatements } from "../types/SimpleStatements";
import { KeywordType } from "../../lexer/enums/KeywordType";
import { ContextType } from "../../lexer/enums/ContextType";
import { TokenType } from "../../lexer/enums/TokenType";
import { NodeType } from "../enums/NodeType";

export const FlowControlAst: Partial<Record<NodeType, SimpleStatements>> = {
    [NodeType.IF_STATEMENT]: [
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.IF },
        { ref: NodeType.ENCAPSULATED_EXPRESSION },
        { ref: NodeType.SCOPE },
        { optionalStatements: [
            { tokenType: TokenType.KEYWORD, dataType: KeywordType.ELSE },
            { ref: [ NodeType.SCOPE, NodeType.IF_STATEMENT ] }
        ] }
    ],

    [NodeType.FOR_STATEMENT]: [
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.FOR },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ENCAPSULATION_START },
        { optional: true, ref: NodeType.ASSIGNED_VARIABLE_DEFINITION },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.LINE_END },
        { optional: true, ref: NodeType.ANY_EXPRESSION },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.LINE_END },
        { optional: true, ref: NodeType.ANY_EXPRESSION },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ENCAPSULATION_END },
        { ref: NodeType.SCOPE }
    ],

    [NodeType.WHILE_STATEMENT]: [
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.WHILE },
        { ref: NodeType.ENCAPSULATED_EXPRESSION },
        { ref: NodeType.SCOPE }
    ],

    [NodeType.FOR_EACH_STATEMENT]: [
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.FOREACH },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ENCAPSULATION_START },
        { ref: NodeType.VARIABLE_DEFINITION },
        { options: [
            { tokenType: TokenType.KEYWORD, dataType: KeywordType.IN },
            { tokenType: TokenType.KEYWORD, dataType: KeywordType.OF }
        ] },
        { ref: [

        ] },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ENCAPSULATION_END },
        { ref: NodeType.SCOPE }
    ],

    [NodeType.CASE_OPEN]: [
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.CASE },
        { ref: NodeType.ANY_EXPRESSION },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.DIVIDER },
        { optional: true, ref: NodeType.CASE_OPEN },
    ],

    [NodeType.SWITCH_CASE]: [
        { options: [
            { ref: NodeType.CASE_OPEN },
            [
                { tokenType: TokenType.KEYWORD, dataType: KeywordType.DEFAULT },
                { tokenType: TokenType.CONTEXT, dataType: ContextType.DIVIDER }
            ]
        ] },
        { ref: [ NodeType.BREAKABLE_SCOPE, NodeType.BREAKABLE_BLOCK ] },
        { optional: true, ref: NodeType.BREAK_STATEMENT },
        { optional: true, ref: NodeType.SWITCH_CASE }
    ],

    [NodeType.SWITCH_STATEMENT]: [
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.SWITCH },
        { ref: NodeType.ENCAPSULATED_EXPRESSION },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.SCOPE_START },
        { ref: NodeType.SWITCH_CASE },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.SCOPE_END }
    ],

    [NodeType.TRY_CATCH_STATEMENT]: [
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.TRY },
        { ref: NodeType.SCOPE },
        { tokenType: TokenType.KEYWORD, dataType: KeywordType.CATCH },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ENCAPSULATION_START },
        { ref: NodeType.VARIABLE_DEFINITION },
        { tokenType: TokenType.CONTEXT, dataType: ContextType.ENCAPSULATION_END },
        { ref: NodeType.SCOPE }
    ]
};