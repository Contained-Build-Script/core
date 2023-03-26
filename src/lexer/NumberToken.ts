import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";
import { ValueType } from "../enums/ValueType";
import { Token } from "../templates/Token";

export class NumberToken extends Token<TokenType.VALUE, ValueType.INT | ValueType.FLOAT> {

    constructor(value: ValueType.INT | ValueType.FLOAT, data: TrimmedDataReader) {
        super(TokenType.VALUE, value, data);
    }

    protected parse(data: TrimmedDataReader): number | undefined {
        const result = data.read(/(?:-)?(?:0x[\da-f]+|0b[01]+|(?:(?:\d+)?\.)?\d+(?:e(?:[-+])?\d+)?)/);

        if (result) {
            const isNegative = +result[0].startsWith("-");

            if (result[0].slice(isNegative).startsWith("0b")) {
                return parseInt(result[0].slice(isNegative + 2), 2);
            } else if (this.valueType == ValueType.INT) {
                return Math.round(Number(result[0]));
            } else {
                return Number(result[0]);
            }
        }
    }
}