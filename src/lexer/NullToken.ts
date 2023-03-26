import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";
import { ValueType } from "../enums/ValueType";
import { Token } from "../templates/Token";

export class NullToken extends Token<TokenType.VALUE, ValueType.NULL> {

    constructor(data: TrimmedDataReader) {
        super(TokenType.VALUE, ValueType.NULL, data);
    }

    protected parse(data: TrimmedDataReader): null | undefined {
        const result = data.read(/null|NULL/);

        if (result) {
            return null;
        }
    }
}