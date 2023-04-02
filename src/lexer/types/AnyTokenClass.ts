import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import type { TokenTypeToDataType } from "./TokenTypeToDataType";
import type { TokenType } from "../enums/TokenType";
import type { DynamicClass } from "./DynamicClass";
import type { Token } from "../Token";

export type AnyTokenClass = DynamicClass<Token<TokenType, TokenTypeToDataType<TokenType>>, [TrimmedDataReader]>;