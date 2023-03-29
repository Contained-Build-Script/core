import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import type { DynamicClass } from "../types/DynamicClass";
import type { TokenType } from "../enums/TokenType";
import type { ValueType } from "../enums/ValueType";
import type { Token } from "./Token";

export class Repository<T extends TokenType> extends Array<DynamicClass<Token<T, ValueType>, [TrimmedDataReader]>> {

    private static readonly instances = new Map<DynamicClass<Repository<TokenType>>, Repository<TokenType>>();

    public static getInstance<T1 extends Repository<TokenType>, T2 extends DynamicClass<T1, [TrimmedDataReader]>>(data: TrimmedDataReader, repo: T2): T1 {
        if (!this.instances.has(repo)) {
            this.instances.set(repo, new repo(data));
        }

        return <T1>this.instances.get(repo);
    }

    private readonly data: TrimmedDataReader;

    protected constructor(data: TrimmedDataReader, ...tokens: DynamicClass<Token<T, ValueType>, [TrimmedDataReader]>[]) {
        super(...tokens);

        this.data = data;
    }

    public add<T2 extends TokenType>(repository: Repository<T2>): Repository<T | T2> {
        return new Repository<T | T2>(repository.data, ...this, ...repository);
    }

    public subtract(repository: Repository<T>): Repository<T> {
        return new Repository<T>(repository.data, ...this.filter((token) => !repository.includes(token)));
    }

    public attemptTokens(): Token<T, ValueType> | undefined {
        for (const token of this) {
            const instance = new token(this.data);
 
            if (instance.test()) {
                return instance;
            }
        }
    }
}