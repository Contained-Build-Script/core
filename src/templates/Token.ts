import type { ValueTypeToType } from "../types/ValueTypeToType";
import type { ValueType } from "../enums/ValueType";
import { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";

export abstract class Token<
    T1 extends TokenType,
    T2 extends T1 extends TokenType.VALUE ? ValueType : ValueType.STRING = T1 extends TokenType.VALUE ? never : ValueType.STRING
> {

    public readonly type: T1;

    public readonly valueType?: ValueType;

    public readonly value?: ValueTypeToType<T2>;

    constructor(type: TokenType.VALUE, valueType: T2, data: TrimmedDataReader);
    constructor(type: T1 extends TokenType.VALUE ? never : T1, data: TrimmedDataReader);
    constructor(type: T1, arg1: T2 | TrimmedDataReader, arg2?: TrimmedDataReader) {
        this.type = type;

        if (arg2 && typeof arg1 == "number") {
            this.valueType = arg1;
            this.value = this.parse(arg2);
        } else if (arg1 instanceof TrimmedDataReader  && type != TokenType.VALUE) {
            this.value = this.parse(arg1);
        } else {
            throw new Error("Argument mismatch");
        }
    }

    protected abstract parse(data: TrimmedDataReader): ValueTypeToType<T2> | undefined;

    public test(): this is Token<T1, T2> & { value: T2 extends ValueType ? ValueTypeToType<T2> : string } {
        return typeof this.value != "undefined";
    }
}