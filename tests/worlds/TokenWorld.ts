import type { World } from "@cucumber/cucumber";
import type { TokenTypeToDataType } from "../../src/lexer/types/TokenTypeToDataType";
import type { TrimmedDataReader } from "../../src/lexer/utils/TrimmedDataReader";
import type { AnyTokenClass } from "../../src/lexer/types/AnyTokenClass";
import type { TokenType } from "../../src/lexer/enums/TokenType";
import type { Token } from "../../src/lexer/Token";

export interface TokenWorld extends World {
    tokens: AnyTokenClass[];
    tokenInstances: Token<TokenType, TokenTypeToDataType<TokenType>>[];
    reader?: TrimmedDataReader;
}