import { TokenType } from "../../lexer/enums/TokenType";
import { TokenTypeToDataType } from "../../lexer/types/TokenTypeToDataType";

export type TokenIdentifiers<T1 extends TokenType> = {
    tokenType: T1;
    dataType?: TokenTypeToDataType<T1> | TokenTypeToDataType<T1>[];
};