export type DynamicClass<T extends {}, A extends Array<unknown> = never[]> = {
    new(...args: A): T;
} & Object;