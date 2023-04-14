import type { TokenType } from "../../lexer/enums/TokenType";
import type { TokenIdentifiers } from "./TokenIdentifiers";
import type { NodeType } from "../enums/NodeType";

type SimpleStatement = ({
    ref: NodeType | NodeType[];
} | {
    options: SimpleStatements[];
} | {
    [K in keyof typeof TokenType]: TokenIdentifiers<(typeof TokenType)[K]>;
}[keyof typeof TokenType]) & {
    optional?: boolean;
} | {
    optionalStatements?: SimpleStatements;
};

export type SimpleStatements = SimpleStatement | Array<SimpleStatement>;