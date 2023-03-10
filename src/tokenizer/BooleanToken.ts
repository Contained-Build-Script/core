import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";
import { ValueType } from "../enums/ValueType";
import { Token } from "../templates/Token";

export class BooleanToken extends Token<TokenType.VALUE, boolean> {

    constructor(data: TrimmedDataReader) {
        super(TokenType.VALUE, ValueType.BOOLEAN, data);
    }

    protected parse(data: TrimmedDataReader): boolean | void {
        const result = data.read(/true|false|TRUE|FALSE/);

        if (result) {
            return result[0].toLowerCase() == "true";
        }
    }
}