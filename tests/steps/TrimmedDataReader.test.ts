import type { TrimmedDataReaderWorld } from "../worlds/TrimmedDataReaderWorld";
import { Before, DataTable, Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { TrimmedDataReader } from "../../src/utils/TrimmedDataReader";

Before<TrimmedDataReaderWorld>(function () {
    this.matches = [];
    this.readers = [];
    this.table = [];
    this.read = "";
});

Given<TrimmedDataReaderWorld>("the following lines:", function (table: DataTable) {
    this.table = table.rows().map((row) => row[0]);
});

When<TrimmedDataReaderWorld>("{string} is read", function (string: string) {
    this.read = string;

    for (const line of this.table) {
        const reader = new TrimmedDataReader(line);

        this.readers.push(reader);
        this.matches.push(reader.read(this.read));
    }
});

Then<TrimmedDataReaderWorld>("all matches are found", function () {
    expect(this.read).to.be.a("string", "This step requires a string to be read");

    for (const match of this.matches) {
        expect(match).to.be.a("string").that.equals(this.read);
    }
});

Then<TrimmedDataReaderWorld>("all offsets are at the end of the input data", function () {
    for (let i = 0; i < this.table.length; i++) {
        expect(this.readers[i]["index"]).to.be.a("number").that.equals(this.table[i].length);
    }
});

Then<TrimmedDataReaderWorld>("all checkpoints are cleaned up", function () {
    for (const reader of this.readers) {
        expect(reader["checkpoints"]).to.be.an("array").that.is.empty;
    }
});