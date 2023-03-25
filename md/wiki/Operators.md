# Operators

CBS comes with the standard set of operators expected from a C-based programming language. These operators are used to evaluate a value based on 1 or 2 inputs.

## Arithmetic

These operators are used to evaluate a numeric value based on the 2 inputs. All these operators can also be appended to an assignment operator to make it a compound assignment operator. For example `#A += #B` is the same as `#A = #A + #B`.

| Operator | Action         | Description                                                                                     |
|----------|----------------|-------------------------------------------------------------------------------------------------|
| `+`      | Addition       | Adds to 2 values together. If the value is a string or array, it will concatenate the 2 values. |
| `-`      | Subtraction    | Subtracts the 2nd value from the 1st value.                                                     |
| `*`      | Multiplication | Multiplies the 2 values together.                                                               |
| `/`      | Division       | Divides the 1st value by the 2nd value.                                                         |
| `%`      | Modulo         | Returns the remainder of the 1st value divided by the 2nd value.                                |

### Increment and decrement

These operators can't be used in compound assignment operators.

| Operator | Action    | Description                 |
|----------|-----------|-----------------------------|
| `++`     | Increment | Adds 1 to the value.        |
| `--`     | Decrement | Subtracts 1 from the value. |

## Comparison

These operators are used to evaluate a boolean value based on comparing 2 inputs of an equal type. The following operators are available:

| Operator | Action                | Description                                                                  |
|----------|-----------------------|------------------------------------------------------------------------------|
| `==`     | Equal                 | Checks if 2 are equal.                                                       |
| `!=`     | Not equal             | Checks if 2 are not equal.                                                   |
| `<`      | Less than             | Checks if the 1st numerical value is less than the 2nd numerical value.      |
| `<=`     | Less than or equal    | Checks if the 1st numerical value is less than or equal to the 2nd value.    |
| `>`      | Greater than          | Checks if the 1st numerical value is greater than the 2nd value.             |
| `>=`     | Greater than or equal | Checks if the 1st numerical value is greater than or equal to the 2nd value. |

## Logical

These operators are used to evaluate a boolean value based on logic gate behavior from 2 inputs which are treated as booleans. The following operators are available:

| Operator | Usage | Description                                                                                                                                                                              |
|----------|-------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `&&`     | AND   | Returns true if both inputs are [truthy](Truthy&#32;&&#32;Falsy.md#truthy-values). If the first input is [falsy](Truthy&#32;&&#32;Falsy.md#falsy-values), the second input is ignored.   |
| `\|\|`   | OR    | Returns true if either input is [truthy](Truthy&#32;&&#32;Falsy.md#truthy-values). If the first input is [truthy](Truthy&#32;&&#32;Falsy.md#truthy-values), the second input is ignored. |
| `!`      | NOT   | Converts the value into a boolean and returns the opposite result.                                                                                                                       |

### Logic operators unique to CBS

| Operator | Usage | Description                                                                                                                                                                                        |
|----------|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `^^`     | XOR   | Returns true if exactly one input is [truthy](Truthy&#32;&&#32;Falsy.md#truthy-values).                                                                                                            |
| `!&&`    | NAND  | Returns true if both or one of the inputs are [falsy](Truthy&#32;&&#32;Falsy.md#falsy-values). If the first input is [falsy](Truthy&#32;&&#32;Falsy.md#falsy-values), the second input is ignored. |
| `!\|\|`  | NOR   | Returns true if both inputs are [falsy](Truthy&#32;&&#32;Falsy.md#falsy-values).                                                                                                                   |

## Bitwise

These operators are used to evaluate a value based on operations on the bit level of 2 (or 1) numerical inputs. Note that floats will be rounded while executing these operations. The following operators are available:

| Operator | Action      | Description                                                                      |
|----------|-------------|----------------------------------------------------------------------------------|
| `&`      | AND         | Returns a value with only the bits set where both inputs are set.                |
| `\|`     | OR          | Returns a value with only the bits set where either of the inputs are set.       |
| `^`      | XOR         | Returns a value with only the bits set where only in one inputs has the bit set. |
| `~`      | NOT         | Inverts all bits of a **single** input.                                          |
| `<<`     | Left shift  | Shifts all bits to the left by pushing a 0 on the right side.                    |
| `>>`     | Right shift | Shifts all bits to the right by pushing a 0 on the left side.                    |

### Bitwise operators unique to CBS

| Operator | Action | Description                                                                                    |
|----------|--------|------------------------------------------------------------------------------------------------|
| `~&`     | NAND   | Returns a value with only the bits set where one or neither of the bits in the inputs are set. |
| `~\|`    | NOR    | Returns a value with only the bits set where neither of the bits in the inputs are set.        |
