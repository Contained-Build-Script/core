import type { TokenType } from "../enums/TokenType";
import type { ValueType } from "../enums/ValueType";
import { TrimmedDataReader } from "../utils/TrimmedDataReader";

export abstract class Token<T extends TokenType> {
    
    public readonly type: T;

    public readonly valueType?: ValueType;
    
    public readonly section: string | false;

    constructor(type: TokenType.VALUE, valueType: ValueType, data: TrimmedDataReader);
    constructor(type: T extends TokenType.VALUE ? never : T, data: TrimmedDataReader);
    constructor(type: T, arg1: ValueType | TrimmedDataReader, arg2?: TrimmedDataReader) {
        this.type = type;

        if (arg2 && typeof arg1 == "number") {
            this.valueType = arg1;
            this.section = this.parse(arg2);
        } else if (arg1 instanceof TrimmedDataReader) {
            this.section = this.parse(arg1);
        } else {
            throw new Error("Argument mismatch");
        }
    }

    protected abstract parse(data: TrimmedDataReader): string | false;
}