# Truthy & Falsy

CBS works with truthy and falsy values. This means that it considers certain values which aren't `true` or `false` to be either truthy or falsy. This is useful for conditional statements, such as `if` statements.

## Falsy values

The following values are considered falsy:

| Value                                                      | Type                          |
|------------------------------------------------------------|-------------------------------|
| `false`                                                    | `bool`                        |
| Any number equal to `0`                                    | `int` or `float`              |
| `""`                                                       | `string`                      |
| `[]`                                                       | `array`                       |
| `"" with ""` or any combination of empty strings and nulls | `command`                     |
| `"" to ""` or any combination of empty strings and nulls   | `difference`                  |
| `null`                                                     | The literal null in any type. |

## Truthy values

Any value with data is considered truthy. This means that anything considered empty or 0/null is not truthy.
