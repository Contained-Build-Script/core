import type { MutationOperatorType } from "../enums/MutationOperatorType";
import type { AssignOperatorType } from "../enums/AssignOperatorType";
import type { UpdateOperatorType } from "../enums/UpdateOperatorType";
import type { OperatorType } from "../enums/OperatorType";
import type { VariableType } from "../enums/VariableType";
import type { ContextType } from "../enums/ContextType";
import type { KeywordType } from "../enums/KeywordType";
import type { TokenType } from "../enums/TokenType";
import type { ValueType } from "../enums/ValueType";

export type TokenTypeToDataType<T extends TokenType> = {
    [TokenType.VALUE]: ValueType,
    [TokenType.CONTEXT]: ContextType,
    [TokenType.KEYWORD]: KeywordType,
    [TokenType.OPERATOR]: OperatorType,
    [TokenType.VARIABLE]: VariableType,
    [TokenType.UPDATE_OPERATOR]: UpdateOperatorType,
    [TokenType.ASSIGN_OPERATOR]: AssignOperatorType,
    [TokenType.MUTATION_OPERATOR]: MutationOperatorType
}[T];