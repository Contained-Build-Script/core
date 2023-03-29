import type { TrimmedDataReader } from "../../utils/TrimmedDataReader";
import { Repository } from "../../templates/Repository";
import { DifferenceToken } from "../DifferenceToken";
import { ValueType } from "../../enums/ValueType";
import { VariableToken } from "../VariableToken";
import { CommandToken } from "../CommandToken";
import { BooleanToken } from "../BooleanToken";
import { StringToken } from "../StringToken";
import { NumberToken } from "../NumberToken";
import { NullToken } from "../NullToken";

export class OperatorReadyRepository extends Repository {

    constructor(data: TrimmedDataReader) {
        super(data,
            VariableToken,
            CommandToken,
            DifferenceToken,
            StringToken,
            NumberToken.bind(null, ValueType.FLOAT),
            NumberToken.bind(null, ValueType.INT),
            BooleanToken,
            NullToken
        );
    }
}