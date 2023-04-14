export enum NodeType {
    // A normal block of code
    BLOCK,
    // A block which can be broken out of using the break keyword
    BREAKABLE_BLOCK,
    // A scope, e.g. { ... }
    SCOPE,
    // A scope with an encapsulation, e.g. ({ ... })
    ENCAPSULATED_SCOPE,
    // A scope which can be broken out of using the break or continue keyword
    BREAKABLE_SCOPE,

    // A function definition argument, e.g. define int x, define int y = 1, define int[] ...z
    TRANSFORMED_FUNCTION_DEFINITION_ARGUMENT,
    // A function definition argument, e.g. define int x, define int y = 1, define int[] ...z
    FUNCTION_DEFINITION_ARGUMENT,
    // A function definition, e.g. define function test() => null { ... }
    FUNCTION_DEFINITION,
    // A definition of the array structure, e.g. [][2]
    VARIABLE_ARRAY_DEFINITION,
    // A function definition, e.g. define int x
    VARIABLE_DEFINITION,
    // A variable definition, e.g. define int x = 1
    ASSIGNED_VARIABLE_DEFINITION,

    // Any expression except the base expression to prevent infinite recursion
    NON_REPEATABLE_EXPRESSION,
    // Any expression which can be evaluated to a value, e.g. 1 + 1
    ANY_EXPRESSION,
    // A statement that can be evaluated to a value using a left and right hand side
    EXPRESSION,
    // An expression which is within parentheses, e.g. (1 + 1)
    ENCAPSULATED_EXPRESSION,
    // An expression which mutates a variable, e.g. !x
    MUTATION_EXPRESSION,
    // An expression which mutates a variable, e.g. ++x
    PRE_UPDATE_EXPRESSION,
    // An expression which updates a variable, e.g. x++
    POST_UPDATE_EXPRESSION,
    // A variable assignment, e.g. x = 1
    VARIABLE_ASSIGNMENT,
    // A function call argument, e.g. 1, 2, 3
    FUNCTION_CALL_ARGUMENT,
    // A function call, e.g. test(1, 2, 3)
    FUNCTION_CALL,
    // Any expression which results in a value type which can't be evaluated in the dynamic ast layer
    ARRAY_ACCESSOR,

    // If statement, e.g. if (true) { ... }
    IF_STATEMENT,
    // For statement, e.g. for (define int i = 0; i < 10; i++) { ... }
    FOR_STATEMENT,
    // While statement, e.g. while (true) { ... }
    WHILE_STATEMENT,
    // For each statement, e.g. foreach (define int i in [1, 2, 3]) { ... }
    FOR_EACH_STATEMENT,
    // A switch case open, e.g. case 1:
    CASE_OPEN,
    // A switch case, e.g. case 1: ...
    SWITCH_CASE,
    // A switch statement, e.g. switch (x) { case 1: ... }
    SWITCH_STATEMENT,
    // A try catch statement, e.g. try { ... } catch (Exception e) { ... }
    TRY_CATCH_STATEMENT,

    // A return statement, e.g. return 1;
    RETURN_STATEMENT,
    // A break statement, e.g. break;
    BREAK_STATEMENT,
    // A continue statement, e.g. continue;
    CONTINUE_STATEMENT,
    // A throw statement, e.g. throw new Exception("test");
    THROW_STATEMENT,

    // A value which indicates an array, e.g. [1, 2, 3]
    ARRAY_LITERAL,
    // A value which indicates an array entry, e.g. [1, 2, 3]
    ARRAY_ENTRY_LITERAL,
    // A value which indicates a command, e.g. "echo" with "test"
    COMMAND_LITERAL,
    // A value which indicates a difference value, e.g. "a" to "b"
    DIFFERENCE_LITERAL,
    // Any value like integer, string, boolean, etc.
    LITERAL,
    // A variable name
    IDENTIFIER
}