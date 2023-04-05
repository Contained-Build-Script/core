import type { AnyTokenClass } from "./types/AnyTokenClass";
import { TrimmedDataReader } from "./utils/TrimmedDataReader";
import { LEXER_TOKEN_ORDER } from "./LexerTokenOrder";
import { Token } from "./Token";

export class Lexer {

    private static readonly tokenClasses: AnyTokenClass[] = LEXER_TOKEN_ORDER.reduce((tokens, tokenObject) => {
        if ("tokenType" in tokenObject) {
            tokens.push(...tokenObject.tokens.map(([ dataType, token ]) => Token.bind(null, token, tokenObject.tokenType, dataType)));
        } else {
            tokens.push(tokenObject);
        }

        return tokens;
    }, <AnyTokenClass[]>[]);

    public readonly tokens: Token[];

    constructor(data: string) {
        const reader = new TrimmedDataReader(data);

        this.tokens = [];

        while (!reader.isAtEnd()) {
            for (let i = 0; i < Lexer.tokenClasses.length; i++) {
                const token = new Lexer.tokenClasses[i](reader);

                if (token.test()) {
                    this.tokens.push(token);

                    break;
                } else if (i == Lexer.tokenClasses.length - 1) {
                    reader.throwSyntaxError();
                }
            }
        }
    }
}