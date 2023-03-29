import type { ValueTypeToType } from "../types/ValueTypeToType";
import type { ValueType } from "../enums/ValueType";
import { TrimmedDataReader } from "../utils/TrimmedDataReader";
import { TokenType } from "../enums/TokenType";

export abstract class Token<T1 extends TokenType, T2 extends ValueType = T1 extends TokenType.VALUE ? never : ValueType.STRING> {

    public readonly type: T1;

    public readonly valueType?: ValueType;

    public readonly value?: ValueTypeToType<T2>;

    public readonly index: number;

    protected readonly data: TrimmedDataReader;

    constructor(data: TrimmedDataReader, type: TokenType.VALUE, valueType: T2);
    constructor(data: TrimmedDataReader, type: T1 extends TokenType.VALUE ? never : T1);
    constructor(data: TrimmedDataReader, type: T1, valueType?: T2) {
        this.data = data;
        this.type = type;
        this.index = data.index;
        this.valueType = valueType;
        
        if (type != TokenType.VALUE || typeof valueType == "number") {
            this.value = this.parse();
        } else {
            throw new Error("Argument mismatch");
        }
    }

    protected abstract parse(): ValueTypeToType<T2> | undefined;

    public test(): this is Token<T1, T2> & { value: ValueTypeToType<T2> } {
        return typeof this.value != "undefined";
    }

    public throwSyntaxError(): never {
        this.data.throwSyntaxError(this.index);
    }
}