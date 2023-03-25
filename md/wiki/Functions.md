# Functions

CBS comes with syntaxes to define functions, which can be used to execute code multiple times. The langue has a few built-in functions, but you can also define your own functions.

## Function definition

A function can be defined using the `define function` statement, this is followed by the function name, the arguments and the return type. The function body is defined using curly brackets.

```ts
print("Hello World!");

// This will push the print function to the function list
// function definitions are available in the entire scope
define function print(define string #text) => string {
    return execute("echo" with #text);
}
```

### Name rules

Like [variables](Variables.md#name-rules), functions come with a set of name rules. The only difference is that a function doesn't need to start with a `#`.

### Return type

A function is usually expected to return a value using the `return` keyword, you predefine this type using the arrow syntax. If you don't want to return a value, you can use the `null` type. In case a function doesn't return a value, you can still use the `return` keyword, but it will be ignored.

```ts
// This will return null
print("Hello World!");

// Even though no return is given, this will return null
define function print(define string #text) => null {
    execute("echo" with #text);
}
```

### Multiple arguments

A function can have multiple arguments, to provide a function multiple arguments, you need to separate them with a comma.

```ts
// This will return the command "echo" with "Hello World!"
commandBuilder("echo", "Hello World!");

define function commandBuilder(define string #command, define string #args) => command {
    return #command with #args;
}
```
