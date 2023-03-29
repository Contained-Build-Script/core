import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import type { DynamicClass } from "../types/DynamicClass";
import type { TokenType } from "../enums/TokenType";
import type { ValueType } from "../enums/ValueType";
import type { StreamToken } from "./StreamToken";
import type { Token } from "./Token";

export class Repository extends Array<DynamicClass<Token<TokenType, ValueType> | StreamToken, [TrimmedDataReader]> | Repository> {

    private static readonly instances = new Map<DynamicClass<Repository>, Repository>();

    public static getInstance<T1 extends Repository, T2 extends DynamicClass<T1, [TrimmedDataReader]>>(data: TrimmedDataReader, repo: T2): T1 {
        if (!this.instances.has(repo)) {
            this.instances.set(repo, new repo(data));
        }

        return <T1>this.instances.get(repo);
    }

    private readonly data: TrimmedDataReader;

    protected constructor(data: TrimmedDataReader, ...tokens: Array<DynamicClass<Token<TokenType, ValueType> | StreamToken, [TrimmedDataReader]> | Repository>) {
        super(...tokens);

        this.data = data;
    }

    public add(repository: Repository): Repository {
        return new Repository(repository.data, ...this, ...repository);
    }

    public subtract(repository: Repository): Repository {
        return new Repository(repository.data, ...this.filter((token) => !repository.includes(token)));
    }

    public attemptTokens(): Token<TokenType, ValueType> | StreamToken | undefined {
        for (const token of this) {
            if (token instanceof Repository) {
                return token.attemptTokens();
            } else {
                const instance = new token(this.data);
    
                if (instance.test()) {
                    return instance;
                }
            }
        }
    }
}