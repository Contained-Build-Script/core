import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";
import { ValueType } from "../enums/ValueType";
import { Token } from "../templates/Token";

export class StringToken extends Token<TokenType.VALUE, string> {

    constructor(data: TrimmedDataReader) {
        super(TokenType.VALUE, ValueType.STRING, data);
    }

    protected parse(data: TrimmedDataReader): string | undefined {
        const result = data.read(/(["'])(.*?(?<!\\)(?:\\\\)*|)\1|`((?:.|\s)*?(?<!\\)(?:\\\\)*|)`/);

        if (result) {
            return result[2] || result[3];
        }
    }
}