import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";
import { ValueType } from "../enums/ValueType";
import { Token } from "../templates/Token";

export class NullToken extends Token<TokenType.VALUE, null> {

    constructor(data: TrimmedDataReader) {
        super(TokenType.VALUE, ValueType.NULL, data);
    }

    protected parse(data: TrimmedDataReader): null | void {
        const result = data.read(/null|NULL/);

        if (result) {
            return null;
        }
    }
}