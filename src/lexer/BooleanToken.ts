import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";
import { ValueType } from "../enums/ValueType";
import { Token } from "../templates/Token";

export class BooleanToken extends Token<TokenType.VALUE, ValueType.BOOLEAN> {

    constructor(data: TrimmedDataReader) {
        super(data, TokenType.VALUE, ValueType.BOOLEAN);
    }

    protected parse(): boolean | undefined {
        const result = this.data.read(/true|false|TRUE|FALSE/);

        if (result) {
            return result[0].toLowerCase() == "true";
        }
    }
}