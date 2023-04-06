import type { World } from "@cucumber/cucumber";
import type { SimpleTokenCollections } from "../../src/lexer/types/SimpleTokenCollections";
import type { Lexer } from "../../src/lexer/Lexer";


export interface LexerWorld extends World {
    collection?: SimpleTokenCollections;
    lexer?: Lexer;
    code?: string;
}