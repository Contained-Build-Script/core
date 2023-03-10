import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import type { DynamicClass } from "../types/DynamicClass";
import type { TokenValue } from "../types/TokenValue";
import type { TokenType } from "../enums/TokenType";
import type { Token } from "./Token";

export class Repository<T extends TokenType> {

    private static readonly instances = new Map<DynamicClass<Repository<TokenType>>, Repository<TokenType>>();

    public static getInstance<T extends DynamicClass<Repository<TokenType>, any>>(repo: T): T | void {
        return <T | void>this.instances.get(repo);
    }

    public readonly tokens: DynamicClass<Token<T, TokenValue>>[];

    constructor(data: TrimmedDataReader, ...tokens: DynamicClass<Token<T, TokenValue>, [TrimmedDataReader]>[]) {
        this.tokens = tokens.map((token) => token.bind(null, data));
    }

    public attemptTokens(): Token<T, TokenValue> | void {
        for (const token of this.tokens) {
            const instance = new token();
 
            if (instance.test()) {
                return instance;
            }
        }
    }
}