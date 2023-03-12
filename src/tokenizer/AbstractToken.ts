import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";
import { Token } from "../templates/Token";

export class AbstractToken<T extends TokenType> extends Token<T, string> {

    private readonly token: string;

    constructor(token: string, type: T extends TokenType.VALUE ? never : T, data: TrimmedDataReader) {
        super(type, data);

        this.token = token;
    }

    protected parse(data: TrimmedDataReader): string | undefined {
        const result = data.read(this.token);

        if (result) {
            return result;
        }
    }
}