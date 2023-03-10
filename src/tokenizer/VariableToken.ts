import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";
import { Token } from "../templates/Token";

export class VariableToken extends Token<TokenType.VARIABLE> {

    constructor(data: TrimmedDataReader) {
        super(TokenType.VARIABLE, data);
    }

    protected parse(data: TrimmedDataReader): string | void {
        const result = data.read(/#(?!\d)[^\s[\]{}()\\\/+\-%=!*^&|<>,.`"';:?]+/);

        if (result) {
            return result[0];
        }
    }
}