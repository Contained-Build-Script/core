import type { World } from "@cucumber/cucumber";
import type { TrimmedDataReader } from "../../src/utils/TrimmedDataReader";

export interface TrimmedDataReaderWorld extends World {
    matches: Array<RegExpExecArray | string | void>[];
    readers: TrimmedDataReader[];
    checkpoints: number[][];
    table: string[];
    read: Array<RegExp | string>;
}