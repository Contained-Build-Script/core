import type { LexerWorld } from "../worlds/LexerWorld";
import { Before, DataTable, Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { MutationOperatorType } from "../../src/lexer/enums/MutationOperatorType";
import { UpdateOperatorType } from "../../src/lexer/enums/UpdateOperatorType";
import { AssignOperatorType } from "../../src/lexer/enums/AssignOperatorType";
import { VariableInfoType } from "../../src/lexer/enums/VariableInfoType";
import { VariableType } from "../../src/lexer/enums/VariableType";
import { LEXER_TOKEN_ORDER } from "../../src/lexer/LexerTokenOrder";
import { OperatorType } from "../../src/lexer/enums/OperatorType";
import { KeywordType } from "../../src/lexer/enums/KeywordType";
import { ContextType } from "../../src/lexer/enums/ContextType";
import { ValueType } from "../../src/lexer/enums/ValueType";
import { TokenType } from "../../src/lexer/enums/TokenType";
import { Lexer } from "../../src/lexer/Lexer";

Before<LexerWorld>(function() {
    this.collection = undefined;
    this.lexer = undefined;
    this.code = undefined;
});

Given<LexerWorld>("the lexer order", function() {
    this.collection = LEXER_TOKEN_ORDER;
});

Given<LexerWorld>("the code {string}", function(code: string) {
    this.code = code;
});

When<LexerWorld>("running the lexer", function() {
    expect(this.code).to.be.a("string");

    this.lexer = new Lexer(this.code!);
});

Then<LexerWorld>("the tokens do not overlap", function() {
    const conflicts: string[] = [];
    const read: string[] = [];

    expect(this.collection).to.be.an("array");

    this.collection!.forEach(({ tokens }) => {
        [...tokens].filter(([ _, token ]) => typeof token == "string").forEach(([ _, token ]) => {
            conflicts.push(...read.filter(
                (readToken) => (<string>token).startsWith(readToken)
            ).map((readToken) => `${readToken} overlaps with ${token}`));

            read.push(<string>token);
        });
    });

    expect(conflicts).to.have.a.lengthOf(0, `The following tokens have an overlap:\n${conflicts.join(",\n")}\n`);
});

Then<LexerWorld>("the tokens are:", function(table: DataTable) {
    const hashes = table.hashes();
    const enumForType = {
        VALUE: ValueType,
        CONTEXT: ContextType,
        KEYWORD: KeywordType,
        OPERATOR: OperatorType,
        VARIABLE: VariableType,
        VARIABLE_INFO: VariableInfoType,
        UPDATE_OPERATOR: UpdateOperatorType,
        ASSIGN_OPERATOR: AssignOperatorType,
        MUTATION_OPERATOR: MutationOperatorType
    };

    expect(this.lexer).to.not.be.an("array");
    expect(this.lexer!.tokens).to.have.a.lengthOf(hashes.length);

    this.lexer!.tokens.forEach((token, i) => {
        expect(token).to.be.an("object", `At index ${i}`);
        expect(token.type).to.be.a("number").which.equals(TokenType[hashes[i].type], `At index ${i}`);
        // @ts-ignore TS refuses to show type errors here and I can't be bothered to fix type errors in a unit test
        expect(token.dataType).to.be.a("number").which.equals(enumForType[hashes[i].type][hashes[i].data_type], `At index ${i}`);
        expect(token.value).to.be.a("string").which.equals(hashes[i].token, `At index ${i}`);
    });
});