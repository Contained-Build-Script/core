import { Before, DataTable, Then, When } from "@cucumber/cucumber";
import type { TokenWorld } from "../worlds/TokenWorld";
import { Given } from "@cucumber/cucumber";
import { TrimmedDataReader } from "../../src/utils/TrimmedDataReader";
import { Token } from "../../src/templates/Token";
import { expect } from "chai";
import { TokenType } from "../../src/enums/TokenType";

Before<TokenWorld>(function() {
    this.tokens = [];
    this.tokenInstances = [];
    this.reader = undefined;
});

Given<TokenWorld>("tokens with the following info:", function(table: DataTable) {
    this.tokens.push(...table.hashes().map(({ parser, type, force_space }) => {
        return class Test extends Token<any, any> {

            constructor(data: TrimmedDataReader) {
                super(TokenType[type], data);
            }

            protected parse(data: TrimmedDataReader): string | undefined {
                const result = data.read(parser);

                if (force_space != "true" || data.followedByWhitespace()) {
                    return result;
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

Then<TokenWorld>("all tokens should be valid", function() {
    this.tokenInstances.forEach((token) => {
        expect(token.test()).to.be.true;
    });
});