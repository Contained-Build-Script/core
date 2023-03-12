import { TokenType } from "../enums/TokenType";
import { TokenValue } from "../types/TokenValue";
import { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { Token } from "./Token";

export abstract class StreamToken {

    protected abstract [Symbol.iterator](): Iterator<Token<TokenType, TokenValue>>;

    public readonly tokens: Token<TokenType, TokenValue>[];

    protected readonly data: TrimmedDataReader;

    private readonly isValid: boolean;

    constructor(data: TrimmedDataReader) {
        const checkpoint = data.addCheckpoint();

        this.tokens = [];
        this.data = data;
        this.isValid = true;

        for (const token of this) {
            if (token.test()) {
                this.tokens.push(token);
            } else {
                this.data.revertToCheckpoint(checkpoint);
                this.isValid = false;

                return;
            }
        }

        this.data.cleanCheckpoint(checkpoint);
    }

    public test(): boolean {
        return this.isValid;
    }
}