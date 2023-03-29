import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { AbstractToken } from "./AbstractToken";
import { TokenType } from "../enums/TokenType";
import { ValueType } from "../enums/ValueType";
import { StringToken } from "./StringToken";
import { Token } from "../templates/Token";

export class CommandToken extends Token<TokenType.VALUE, ValueType.COMMAND> {

    constructor(data: TrimmedDataReader) {
        super(data, TokenType.VALUE, ValueType.COMMAND);
    }

    protected parse(): [ string, string ] | undefined {
        const arg0 = new StringToken(this.data);
        const connection = new AbstractToken(this.data, TokenType.CONTEXT, "with");
        const arg1 = new StringToken(this.data);

        if (arg0.test() && connection.test() && arg1.test()) {
            return [ arg0.value, arg1.value ];
        }
    }
}