import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";
import { ValueType } from "../enums/ValueType";
import { Token } from "../templates/Token";

export class StringToken extends Token<TokenType.VALUE, ValueType.STRING> {

    constructor(data: TrimmedDataReader) {
        super(data, TokenType.VALUE, ValueType.STRING);
    }

    protected parse(): string | undefined {
        const result = this.data.read(/(["'])(.*?(?<!\\)(?:\\\\)*|)\1|`((?:.|\s)*?(?<!\\)(?:\\\\)*|)`/);

        if (result) {
            return result[2] || result[3];
        }
    }
}