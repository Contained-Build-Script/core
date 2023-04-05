import type { TrimmedDataReader } from "../utils/TrimmedDataReader";
import type { DynamicClass } from "./DynamicClass";
import type { Token } from "../Token";

export type AnyTokenClass = DynamicClass<Token, [TrimmedDataReader]>;