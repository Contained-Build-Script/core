import type { TokenTypeToDataType } from "./TokenTypeToDataType";
import type { TokenType } from "../enums/TokenType";

export type SimpleTokenCollection<T extends TokenType> = {
    tokenType: T,
    tokens: [TokenTypeToDataType<T>, string | RegExp][]
};