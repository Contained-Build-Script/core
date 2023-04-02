export enum TokenType {
    // A value like a string, number, boolean, or null.
    VALUE,
    // Additional characters that add context to a larger token like {}[]().
    CONTEXT,
    // A keyword like if, else, while, etc.
    KEYWORD,
    // An operator like +, -, *, /, etc.
    OPERATOR,
    // A variable like #var, #var1, #var2, etc.
    VARIABLE,
    // A variable definition keyword like string, number, const, etc.
    VARIABLE_INFO
}