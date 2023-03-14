import type { TokenWorld } from "../worlds/TokenWorld";
import { Before, DataTable, Then, When, Given } from "@cucumber/cucumber";
import { expect } from "chai";
import { TrimmedDataReader } from "../../src/utils/TrimmedDataReader";
import { ValueType } from "../../src/enums/ValueType";
import { TokenType } from "../../src/enums/TokenType";
import { Token } from "../../src/templates/Token";

Before<TokenWorld>(function() {
    this.tokens = [];
    this.tokenInstances = [];
    this.reader = undefined;
});

Given<TokenWorld>(/^(string|regex) parser tokens with the following info:$/, function(parserType: string, table: DataTable) {
    this.tokens.push(...table.hashes().map(({ parser, type, force_space }) => {
        return class Test extends Token<any, any> {

            constructor(data: TrimmedDataReader) {
                super(TokenType[type], data);
            }

            protected parse(data: TrimmedDataReader): string | undefined {
                const result = parserType == "regex" ? data.read(new RegExp(parser)) : data.read(parser);

                if (force_space != "true" || data.followedByWhitespace()) {
                    return Array.isArray(result) ? result[0] : result;
                }
            }
        }
    }));
});

Given<TokenWorld>(/^(string|regex) parser value tokens with the following info:$/, function(parserType: string, table: DataTable) {
    const isRegex = parserType == "regex";

    this.tokens.push(...table.hashes().map(({ parser, type, force_space }) => {
        return class Test extends Token<any, any> {

            constructor(data: TrimmedDataReader) {
                super(TokenType.VALUE, ValueType[type], data);
            }

            protected parse(data: TrimmedDataReader): any {
                const result = isRegex ? data.read(new RegExp(parser)) : data.read(parser);

                if (result && (force_space != "true" || data.followedByWhitespace())) {
                    return JSON.parse(Array.isArray(result) ? result[0] : result);
                }
            }
        }
    }));
});

Given<TokenWorld>("a data parser with {string} as data", function(data: string) {
    this.reader = new TrimmedDataReader(data);
});

When<TokenWorld>("parsing the data in order", function() {
    this.tokenInstances.push(...this.tokens.map((token) => {
        return new token(this.reader!);
    }));
});

Then<TokenWorld>("the tokens should be:", function(table: DataTable) {
    table.raw().map(([ value ], i) => {
        expect(this.tokenInstances[i].value).to.be.a("string").which.equals(value);
    });
});

Then<TokenWorld>("the tokens and types should be:", function(table: DataTable) {
    table.hashes().map(({ value, type }, i) => {
        expect(this.tokenInstances[i].value).to.be.a(type).which.equals(JSON.parse(value));
    });
});

Then<TokenWorld>("all tokens should be valid", function() {
    this.tokenInstances.forEach((token) => {
        expect(token.test()).to.be.true;
    });
});