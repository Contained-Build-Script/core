import type { TokenWorld } from "../worlds/TokenWorld";
import { Before, DataTable, Then, When, Given } from "@cucumber/cucumber";
import { expect } from "chai";
import { MutationOperatorType } from "../../src/lexer/enums/MutationOperatorType";
import { UpdateOperatorType } from "../../src/lexer/enums/UpdateOperatorType";
import { AssignOperatorType } from "../../src/lexer/enums/AssignOperatorType";
import { TrimmedDataReader } from "../../src/lexer/utils/TrimmedDataReader";
import { VariableType } from "../../src/lexer/enums/VariableType";
import { OperatorType } from "../../src/lexer/enums/OperatorType";
import { KeywordType } from "../../src/lexer/enums/KeywordType";
import { ContextType } from "../../src/lexer/enums/ContextType";
import { ValueType } from "../../src/lexer/enums/ValueType";
import { TokenType } from "../../src/lexer/enums/TokenType";
import { Token } from "../../src/lexer/Token";

Before<TokenWorld>(function() {
    this.tokens = [];
    this.tokenInstances = [];
    this.reader = undefined;
});

Given<TokenWorld>(/^(string|regex) parser tokens with the following info:$/, function(parserType: "string" | "regex", table: DataTable) {
    const enumForType = {
        VALUE: ValueType,
        CONTEXT: ContextType,
        KEYWORD: KeywordType,
        OPERATOR: OperatorType,
        VARIABLE: VariableType,
        UPDATE_OPERATOR: UpdateOperatorType,
        ASSIGN_OPERATOR: AssignOperatorType,
        MUTATION_OPERATOR: MutationOperatorType
    };

    this.tokens.push(...table.hashes().map(({ token, type, data_type }) => {
        // @ts-ignore TS refuses to show type errors here and I can't be bothered to fix type errors in a unit test
        return Token.bind(null, parserType == "string" ? token : new RegExp(token), TokenType[type], enumForType[type][data_type]);
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

Then<TokenWorld>("all tokens should be valid", function() {
    this.tokenInstances.forEach((token, i) => {
        expect(token.test()).to.be.a("boolean", `At index ${i}`).which.equals(true, `At index ${i}`);
    });
});

Then<TokenWorld>("the tokens should be:", function(table: DataTable) {
    table.hashes().map(({ value, has_trailing_whitespace, index }, i) => {
        expect(this.tokenInstances[i].value).to.be.a("string", `At index ${i}`).which.equals(value, `At index ${i}`);
        expect(this.tokenInstances[i].hasTrailingWhitespace).to.be.a("boolean", `At index ${i}`).which.equals(has_trailing_whitespace == "true", `At index ${i}`);
        expect(this.tokenInstances[i].index).to.be.a("number", `At index ${i}`).which.equals(Number(index), `At index ${i}`);
        expect(this.tokenInstances[i].type).to.be.a("number", `At index ${i}`);
        expect(this.tokenInstances[i].dataType).to.be.a("number", `At index ${i}`);
    });
});