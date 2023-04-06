import type { SimpleTokenCollection } from "./SimpleTokenCollection";
import type { TokenType } from "../enums/TokenType";

export type SimpleTokenCollections = Array<{
    [K in keyof typeof TokenType]: SimpleTokenCollection<(typeof TokenType)[K]>
}[keyof typeof TokenType]>;