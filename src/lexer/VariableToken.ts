import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";
import { Token } from "../templates/Token";

export class VariableToken extends Token<TokenType.VARIABLE> {

    constructor(data: TrimmedDataReader) {
        super(data, TokenType.VARIABLE);
    }

    protected parse(): string | undefined {
        const result = this.data.read(/#(?!\d)[^\s[\]{}()\\\/+\-%=!*^&|<>,.`"';:?]+/);

        if (result) {
            return result[0];
        }
    }
}