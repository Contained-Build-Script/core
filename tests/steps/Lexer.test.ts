import type { SimpleTokenCollections } from "../../src/lexer/types/SimpleTokenCollections";
import type { SimpleTokenCollection } from "../../src/lexer/types/SimpleTokenCollection";
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
    this.env = undefined;
    this.code = undefined;
});

Given<LexerWorld>("the lexer order", function() {
    this.env = LEXER_TOKEN_ORDER;
});

Given<LexerWorld>("the code {string}", function(code: string) {
    this.code = code;
});

When<LexerWorld>("running the lexer", function() {
    expect(this.code).to.be.a("string");

    this.env = new Lexer(this.code!);
});

Then<LexerWorld>("the tokens do not overlap", function() {
    const conflicts: string[] = [];

    expect(this.env).to.be.an("array");

    (<SimpleTokenCollections>this.env).reduce((read, { tokens }) => {
        read.filter(([ _, token ]) => {
            return typeof token == "string";
        }).forEach((tokenDefinition) => {
            conflicts.push(...<string[]>(<SimpleTokenCollection<TokenType>["tokens"]>tokens).map(([ _, token ]) => {
                return token;
            }).filter((token) => {
                if (typeof token == "string") {
                    return token.startsWith(<string>tokenDefinition[1]);
                } else {
                    return false;
                }
            }));
        });

        return read.concat(tokens);
    }, <SimpleTokenCollection<TokenType>["tokens"]>[]);

    expect(conflicts).to.have.a.lengthOf(0, `The following tokens have overlap:\n${conflicts.join(",\n")}\n`);
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

    expect(this.env).to.not.be.an("array");
    expect((<Lexer>this.env).tokens).to.have.a.lengthOf(hashes.length);

    (<Lexer>this.env).tokens.forEach((token, i) => {
        expect(token).to.be.an("object", `At index ${i}`);
        expect(token.type).to.be.a("number").which.equals(TokenType[hashes[i].type], `At index ${i}`);
        // @ts-ignore TS refuses to show type errors here and I can't be bothered to fix type errors in a unit test
        expect(token.dataType).to.be.a("number").which.equals(enumForType[hashes[i].type][hashes[i].data_type], `At index ${i}`);
        expect(token.value).to.be.a("string").which.equals(hashes[i].token, `At index ${i}`);
    });
});