import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import type { TokenType } from "../enums/TokenType";
import { Token } from "./Token";

export abstract class BaseToken<T extends TokenType> extends Token<T> {

    protected abstract [Symbol.iterator](): Iterator<Token<TokenType>>;

    public readonly tokens: Token<TokenType>[];

    protected readonly data: TrimmedDataReader;

    private readonly checkpoint: number;
    
    constructor(type: T extends TokenType.VALUE ? never : T, data: TrimmedDataReader) {
        const checkpoint = data.addCheckpoint();

        super(type, data);

        this.data = data;
        this.checkpoint = checkpoint;
        this.tokens = [ this, ...this ];
    }

    protected isValid(): boolean {
        if (this.tokens.every((token) => token.section)) {
            this.data.cleanCheckpoint(this.checkpoint);

            return true;
        } else {
            this.data.revertCheckpoint(this.checkpoint);

            return false;
        }
    }
}