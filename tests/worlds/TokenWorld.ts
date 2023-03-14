import type { World } from "@cucumber/cucumber";
import type { TrimmedDataReader } from "../../src/utils/TrimmedDataReader";
import type { DynamicClass } from "../../src/types/DynamicClass";
import type { Token } from "../../src/templates/Token";

export interface TokenWorld extends World {
    tokens: DynamicClass<Token<any, any>, [TrimmedDataReader]>[];
    tokenInstances: Token<any, any>[];
    reader?: TrimmedDataReader;
}