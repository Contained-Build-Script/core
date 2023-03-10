import type { TrimmedDataReaderWorld } from "../worlds/TrimmedDataReaderWorld";
import { After, Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { TrimmedDataReader } from "../../src/utils/TrimmedDataReader";

// Clean up the world after each scenario
After<TrimmedDataReaderWorld<string | RegExpExecArray>>(function () {
    delete this.match;
    delete this.read;
    delete this.reader;
});

Given<TrimmedDataReaderWorld<string>>("the line {string}", function (string) {
    this.reader = new TrimmedDataReader(string);
});

When<TrimmedDataReaderWorld<string>>("{string} is read", function (string) {
    this.match = this.reader!.read(this.read = string);
});

Then<TrimmedDataReaderWorld<string>>("a match is found", function () {
    expect(this.match).to.be.a("string").that.equals(this.read);
});