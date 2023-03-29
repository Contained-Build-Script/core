import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";
import { Token } from "../templates/Token";

export class ArithmeticAssignToken extends Token<TokenType.OPERATOR> {

    constructor(data: TrimmedDataReader) {
        super(data, TokenType.OPERATOR);
    }

    protected parse(): string | undefined {
        return this.data.read(/[-+*%/]=/)?.[0];
    }
}