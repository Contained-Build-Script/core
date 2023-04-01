import type { TrimmedDataReaderWorld } from "../worlds/TrimmedDataReaderWorld";
import { Before, DataTable, Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { TrimmedDataReader } from "../../src/utils/TrimmedDataReader";

Before<TrimmedDataReaderWorld>(function() {
    this.matches = [];
    this.readers = [];
    this.checkpoints = [];
    this.table = [];
    this.read = [];
});

Given<TrimmedDataReaderWorld>("the following lines:", function(table: DataTable) {
    this.table = table.raw().map(([ line ]) => {
        this.readers.push(new TrimmedDataReader(line));

        return line;
    });
});

Given<TrimmedDataReaderWorld>("a checkpoint is set", function() {
    this.readers.forEach((reader, i) => {
        if (this.checkpoints[i]) {
            this.checkpoints[i].push(reader.addCheckpoint());
        } else {
            this.checkpoints[i] = [ reader.addCheckpoint() ];
        }
    });
});

When<TrimmedDataReaderWorld>("{string} is read", function(data: string) {
    this.read.push(data);
    this.readers.forEach((reader, i) => {
        reader.skipWhitespace();

        if (this.matches[i]) {
            this.matches[i].push(reader.read(data));
        } else {
            this.matches[i] = [ reader.read(data) ];
        }
    });
});

When<TrimmedDataReaderWorld>(/^the (first|last) checkpoint is used$/, function(type: "first" | "last") {
    this.readers.forEach((reader, i) => {
        reader.revertToCheckpoint(this.checkpoints[i][type == "first" ? 0 : this.checkpoints[i].length - 1]);
    });
});

When<TrimmedDataReaderWorld>(/^the (first|last) checkpoint is cleaned up$/, function(type: "first" | "last") {
    this.readers.forEach((reader, i) => {
        reader.cleanCheckpoint(this.checkpoints[i][type == "first" ? 0 : this.checkpoints[i].length - 1]);
    });
});

Then<TrimmedDataReaderWorld>("all matches are found", function() {
    this.read.forEach((string) => {
        expect(string).to.be.a("string");
    });

    this.matches.forEach((matchList) => {
        matchList.forEach((match, i) => {
            expect(match).to.be.a("string").which.equals(this.read[i]);
        });
    });
});

Then<TrimmedDataReaderWorld>(/^all offsets are at the (start|end) of the input data$/, function(type: "start" | "end") {
    this.table.forEach((line, i) => {
        expect(this.readers[i]["index"]).to.be.a("number").which.equals(type == "start" ? new TrimmedDataReader(this.readers[i].data).index : line.length);
    });
});

Then<TrimmedDataReaderWorld>("the line is followed by a whitespace", function() {
    this.readers.forEach((reader) => {
        expect(reader.isAtWhitespace()).to.be.a("boolean").that.is.true;
    });
});

Then<TrimmedDataReaderWorld>("all checkpoints are cleaned up", function() {
    this.readers.forEach((reader) => {
        expect(reader["checkpoints"]).to.be.an("array").that.is.empty;
    });
});