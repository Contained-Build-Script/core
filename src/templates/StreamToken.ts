import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import type { TokenType } from "../enums/TokenType";
import type { ValueType } from "../enums/ValueType";
import type { Token } from "./Token";
import { Repository } from "./Repository";

export abstract class StreamToken {

    protected abstract [Symbol.iterator](): Iterator<Token<TokenType, ValueType> | Repository<TokenType> | StreamToken | undefined>;

    public readonly tokens: Token<TokenType, ValueType>[];

    protected readonly data: TrimmedDataReader;

    private readonly isValid: boolean;

    constructor(data: TrimmedDataReader) {
        const checkpoint = data.addCheckpoint();

        this.tokens = [];
        this.data = data;
        this.isValid = true;

        for (const token of this) {
            const extractedToken = token instanceof Repository ? token.attemptTokens() : token;

            if (extractedToken?.test()) {
                this.tokens.push(extractedToken);
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