import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";
import { ValueType } from "../enums/ValueType";
import { Token } from "../templates/Token";

export class NullToken extends Token<TokenType.VALUE, ValueType.NULL> {

    constructor(data: TrimmedDataReader) {
        super(data, TokenType.VALUE, ValueType.NULL);
    }

    protected parse(): null | undefined {
        const result = this.data.read(/null|NULL/);

        if (result) {
            return null;
        }
    }
}