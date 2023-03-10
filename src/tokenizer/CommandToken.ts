import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";
import { ValueType } from "../enums/ValueType";
import { Token } from "../templates/Token";
import { StringToken } from "./StringToken";
import { AbstractToken } from "./AbstractToken";

export class CommandToken extends Token<TokenType.VALUE, [ string, string ]> {

    constructor(data: TrimmedDataReader) {
        super(TokenType.VALUE, ValueType.COMMAND, data);
    }

    protected parse(data: TrimmedDataReader): [ string, string ] | void {
        const arg0 = new StringToken(data);
        const connection = new AbstractToken("with", TokenType.CONTEXT, data);
        const arg1 = new StringToken(data);

        if (arg0.test() && connection.test() && arg1.test()) {
            return [ arg0.value, arg1.value ];
        }
    }
}