import type { ValueType } from "../enums/ValueType";

export type ValueTypeToType<T extends ValueType> = {
    [ValueType.INT]: number;
    [ValueType.NULL]: null;
    [ValueType.ARRAY]: any[];
    [ValueType.FLOAT]: number;
    [ValueType.STRING]: string;
    [ValueType.BOOLEAN]: boolean;
    [ValueType.COMMAND]: [ string, string ];
    [ValueType.DIFFERENCE]: [ string, string ];
}[T];