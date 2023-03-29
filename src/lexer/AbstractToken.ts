import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";
import { Token } from "../templates/Token";

export class AbstractToken<T extends Exclude<TokenType, TokenType.VALUE>> extends Token<T> {

    private readonly token: string;

    constructor(data: TrimmedDataReader, type: T extends TokenType.VALUE ? never : T, token: string) {
        super(data, type);

        this.token = token;
    }

    protected parse(): string | undefined {
        const result = this.data.read(this.token);

        if (result) {
            return result;
        }
    }
}