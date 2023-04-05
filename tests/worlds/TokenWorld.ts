import type { World } from "@cucumber/cucumber";
import type { TrimmedDataReader } from "../../src/lexer/utils/TrimmedDataReader";
import type { AnyTokenClass } from "../../src/lexer/types/AnyTokenClass";
import type { Token } from "../../src/lexer/Token";

export interface TokenWorld extends World {
    tokens: AnyTokenClass[];
    tokenInstances: Token[];
    reader?: TrimmedDataReader;
}