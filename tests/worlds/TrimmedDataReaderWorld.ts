import type { World } from "@cucumber/cucumber";
import type { TrimmedDataReader } from "../../src/utils/TrimmedDataReader";

export interface TrimmedDataReaderWorld<T extends RegExpExecArray | string> extends World {
    match?: T | void;
    read?: T;
    reader?: TrimmedDataReader;
}