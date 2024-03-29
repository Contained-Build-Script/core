import type { TokenTypeToDataType } from "./types/TokenTypeToDataType";
import type { TrimmedDataReader } from "./utils/TrimmedDataReader";
import type { TokenType } from "./enums/TokenType";

export class Token<T1 extends TokenType = TokenType> {

    public readonly type: T1;

    public readonly dataType: TokenTypeToDataType<T1>;

    public readonly index: number;
    
    public readonly value: string;

    public readonly hasTrailingWhitespace: boolean;

    private readonly data: TrimmedDataReader;

    constructor(token: string | RegExp, type: T1, dataType: TokenTypeToDataType<T1>, data: TrimmedDataReader) {
        const checkpoint = data.addCheckpoint();

        this.type = type;
        this.dataType = dataType;
        this.index = data.index;

        if (typeof token == "string") {
            this.value = data.read(token) ?? "";
        } else {
            this.value = data.read(token)?.[0] ?? "";
        }

        this.hasTrailingWhitespace = data.isAtWhitespace();
        this.data = data;

        if (this.test()) {
            data.cleanCheckpoint(checkpoint);
        } else {
            data.revertToCheckpoint(checkpoint);
        }
    }

    public test(): boolean {
        return Boolean(this.value);
    }

    public throwSyntaxError(): never {
        this.data.throwSyntaxError(this.index);
    }
}