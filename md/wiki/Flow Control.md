# Flow Control

Just like most programming languages, CBS has flow control structures that allow you to change the order in which statements are executed. With these structures you can create conditions, repeated executions, and more.

## If

The `if` statement is used to execute a block of code if a condition is [truthy](Truthy&#32;&&#32;Falsy.md#truthy-values). The condition can by any expression except a variable definition. If the condition is [falsy](Truthy&#32;&&#32;Falsy.md#falsy-values), the block of code will be skipped. And optionally go to the next condition or else block.

### Else

If you want to execute a block of code if the condition is [falsy](Truthy&#32;&&#32;Falsy.md#falsy-values), you can use the `else` statement. If the condition is [truthy](Truthy&#32;&&#32;Falsy.md#truthy-values), the block of code will be skipped.

### Chainable if

If you want to chain multiple `if` statements together, you can use the `else if` statement. If the previous condition was [falsy](Truthy&#32;&&#32;Falsy.md#falsy-values), the next `else if` statement will be checked. If the condition is [truthy](Truthy&#32;&&#32;Falsy.md#truthy-values), the block of code will be executed and all following `else if` or `else` statements will be skipped.

### If example

```ts
define const bool #test = true;

if (#test) {
    execute("echo" with "test is true");
} else if (#test == false) {
    execute("echo" with "test is false");
} else {
    execute("echo" with "test is unset");
}
```

## Switch

The `switch` statement is used to execute a block of code based on a match condition. If the input and the case match, the block will be executed, otherwise it will be skipped. If no case matches, the `default` block will be executed if it's present.

### Case

The `case` statement is used to define a case for the `switch` statement. If the input and the case match, the block will be executed, otherwise it will be skipped.

### Default

The `default` statement is used to define a default case for the `switch` statement. If no case matches, the `default` block will be executed.

### Break

The `break` statement is used to break out of the `switch` statement. If the `break` statement is not present, the `switch` statement will continue to the next case.

### Switch example

```ts
define const string #test = "test";

switch (#test) {
    case "test": 
        execute("echo" with "test is test");
        break;
    case "test2":
        execute("echo" with "test is test2");
        break;
    default:
        execute("echo" with "test is something else");
}

// Multiple cases
switch (#test) {
    case "test":
    case "test2":
        execute("echo" with "test is test or test2");
        break;
    default:
        execute("echo" with "test is something else");
}

// Fallthrough
switch (#test) {
    case "test":
        execute("echo" with "test is test");
    case "test2":
        execute("echo" with "test is test2");
        break;
    default:
        // This will be executed even though it does first match the test case
        execute("echo" with "test is something else or test");
}
```

## While

The `while` statement is used to execute a block of code while a condition is [truthy](Truthy&#32;&&#32;Falsy.md#truthy-values). The condition can by any expression except a variable definition. If the condition is [falsy](Truthy&#32;&&#32;Falsy.md#falsy-values), the while loop will be stopped.

### While example

```ts
define int #i = 0;
define const int #goal = 10;

while (#i < #goal) {
    // This will be executed 10 times
    #i++;
}
```

## For

The `for` statement is used to execute a block of code as long as a condition is [truthy](Truthy&#32;&&#32;Falsy.md#truthy-values). The condition can by any expression except a variable definition. If the condition is [falsy](Truthy&#32;&&#32;Falsy.md#falsy-values), the for loop will be stopped. The `for` loop comes with 3 parts separated by a `;`:

1. The initialization part, which is executed before the loop starts.
2. The condition part, which is executed before each iteration.
3. The processing part, which is executed after each iteration.

### Initialization

Here you can define variables that will be used in the loop. You can define multiple variables by separating them with a `,`. The variables will be defined in the scope of the `for` loop.

### Condition

Here you can define a condition that will be checked before each iteration. The condition can by any expression except a variable definition. If the condition is [falsy](Truthy&#32;&&#32;Falsy.md#falsy-values), the for loop will be stopped.

### Processing

Here you can define any expression that will be executed after each iteration. The expression can by anything except a variable definition. You can define multiple expressions by separating them with a `,`.

### For example

```ts
for (define int #i = 0; #i < 10; #i++) {
    // This will be executed 10 times
}

// With multiple variables
for (define int #i = 0, define const int #goal = 10; #i < #goal; #i++) {
    // This will be executed 10 times
}

// With multiple expressions
for (define int #i = 0; #i < 10; #i += 2, #i--) {
    // This will be executed 10 times
}
```

## Foreach

The `foreach` statement is used to execute a block of code for each element in a string or list. The `foreach` loop comes with 2 keywords to identify the elements to extract.

### In

The `in` keyword is used to extract the indexes from a string or list. This will return the index of the current element.

### Of

The `of` keyword is used to extract the elements from a string or list. This will return the exact value of the current element.

### Foreach example

```ts
foreach (define const int #i in "test") {
    // #i will be 0, 1, 2, 3
}

foreach (define const string #c of "test") {
    // #c will be "t", "e", "s", "t"
}

foreach (define const int #i in [1, 2, 3]) {
    // #i will be 0, 1, 2
}

foreach (define const int #n of [1, 2, 3]) {
    // #n will be 1, 2, 3
}
```
