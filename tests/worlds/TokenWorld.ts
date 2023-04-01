import type { World } from "@cucumber/cucumber";
import type { TokenTypeToDataType } from "../../src/types/TokenTypeToDataType";
import type { TrimmedDataReader } from "../../src/utils/TrimmedDataReader";
import type { AnyTokenClass } from "../../src/types/AnyTokenClass";
import type { TokenType } from "../../src/enums/TokenType";
import type { Token } from "../../src/lexer/Token";

export interface TokenWorld extends World {
    tokens: AnyTokenClass[];
    tokenInstances: Token<TokenType, TokenTypeToDataType<TokenType>>[];
    reader?: TrimmedDataReader;
}