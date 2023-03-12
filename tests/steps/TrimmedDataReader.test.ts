import type { TrimmedDataReaderWorld } from "../worlds/TrimmedDataReaderWorld";
import { Before, DataTable, Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { TrimmedDataReader } from "../../src/utils/TrimmedDataReader";

Before<TrimmedDataReaderWorld>(function () {
    this.matches = [];
    this.readers = [];
    this.checkpoints = [];
    this.table = [];
    this.read = "";
});

Given<TrimmedDataReaderWorld>("the following lines:", function (table: DataTable) {
    this.table = table.rows().map(([ line ]) => {
        this.readers.push(new TrimmedDataReader(line));

        return line;
    });
});

Given<TrimmedDataReaderWorld>("a checkpoint is set", function () {
    this.readers.forEach((reader, i) => {
        if (this.checkpoints[i]) {
            this.checkpoints[i].push(reader.addCheckpoint());
        } else {
            this.checkpoints[i] = [ reader.addCheckpoint() ];
        }
    });
});

When<TrimmedDataReaderWorld>("{string} is read", function (string: string) {
    this.read = string;
    this.readers.forEach((reader) => {
        this.matches.push(reader.read(string))
    });
});

When<TrimmedDataReaderWorld>(/^the (first|last) checkpoint is used$/, function (type: "first" | "last") {
    this.readers.forEach((reader, i) => {
        reader.revertToCheckpoint(this.checkpoints[i][type == "first" ? 0 : this.checkpoints[i].length - 1]);
    });
});

When<TrimmedDataReaderWorld>(/^the (first|last) checkpoint is cleaned up$/, function (type: "first" | "last") {
    this.readers.forEach((reader, i) => {
        reader.cleanCheckpoint(this.checkpoints[i][type == "first" ? 0 : this.checkpoints[i].length - 1]);
    });
});

Then<TrimmedDataReaderWorld>("all matches are found", function () {
    expect(this.read).to.be.a("string", "This step requires a string to be read");

    this.matches.forEach((match) => {
        expect(match).to.be.a("string").that.equals(this.read);
    });
});

Then<TrimmedDataReaderWorld>(/^all offsets are at the (start|end) of the input data$/, function (type: "start" | "end") {
    this.table.forEach((line, i) => {
        expect(this.readers[i]["index"]).to.be.a("number").that.equals(type == "start" ? 0 : line.length);
    });
});

Then<TrimmedDataReaderWorld>("all checkpoints are cleaned up", function () {
    this.readers.forEach((reader) => {
        expect(reader["checkpoints"]).to.be.an("array").that.is.empty;
    });
});