export enum TokenType {
    // A value like a string, number, boolean, or null.
    VALUE,
    // Additional characters that add context to a larger token like {}, [], (), :, ;, etc.
    CONTEXT,
    // A keyword like if, else, while, etc.
    KEYWORD,
    // An operator like +, -, *, /, etc.
    OPERATOR,
    // A variable like #var, #var1, #var2, etc.
    VARIABLE,
    // A variable definition keyword like string, number, etc.
    VARIABLE_INFO,
    // An update operator like ++ and --
    UPDATE_OPERATOR,
    // An assignment operator like =, +=, -=, etc.
    ASSIGN_OPERATOR,
    // A mutation operator like ~ and !
    MUTATION_OPERATOR
}