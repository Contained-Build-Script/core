export enum TokenType {
    // A value like a string, number, boolean, or null.
    VALUE,
    // Additional characters that add context to a larger token like {}[]().
    CONTEXT,
    // A keyword like if, else, while, etc.
    KEYWORD,
    // A variable like #var, #var1, #var2, etc.
    VARIABLE,
    // An operator like +, -, *, /, etc.
    OPERATOR,
    // A keyword or variable definition keyword like define, string, number, etc.
    DEFINITION
}