# Variables

Variables are used to store information to be referenced and manipulated in a script. They are created when a value is assigned to them using `=`. Variable names are case-sensitive and always start with a `#`.

## Defining variables

A variable is defined by using the `define` keyword, followed by the variable type and the variable name.

### Types

The variable type can be any of the following:

- `null`
- `bool`
- `int`
- `float`
- `string`
- `command`
- `difference`

### Arrays

Besides the basic types you can also use arrays and multi-dimensional arrays by appending `[]` to the type. You can also use a number within the `[]` to define the size of the array. You can assign values to the array by using the `=` operator followed by a `[]` with values, expressions, function calls or variables inside separated by a comma. Note that you can't put the base type into the same array as a multi-dimensional array.

You can reassign values to the array by writing the variable name, followed up by a `[]` with the index of the value you want to change. You can also use the `[]` operator to get a value from the array. For multi-dimensional arrays you can use multiple index accessors back to back to navigate the array. Note that indexes start from 0.

### Name rules

The variable name must start with a `#` it can't be followed up with a number, and any of the following characters are not allowed: ``[]{}()\/<>+-%=!?*^&|,.`"';:``. Besides that any UTF-8 character except whitespaces are allowed. Keep in mind that a variable can't exist multiple times in the same scope.

## Assigning values

A variable can have either a static value, expression, function call or a variable assigned to it, just like any other language. The value is assigned using the `=` operator. If nothing is initially assigned to a variable, it will by default be `null`. You can also assign `null` later on, regardless of the type.

### Assignment example

```ts
// An empty string variable which contains null
define string #empty;

// A string variable which contains "Hello World!"
define string #a_string = "Hello World!";

// Unsetting a variable
#a_string = null;

// An array with 5 integers but without a size constraint
define int[] #an_array = [1, 2, 3, 4, 5];

// Assigning a value to the first index of the array
#an_array[0] = 5;

// An array with a size of 5 with 5 integers
define int[5] #another_array = [1, 2, 3, 4, 5];

// An array with 2 multi-dimensional arrays with a size of 2 for each array
define int[][2] #a_multi_array = [[1, 2], [3, 4], [5, 6]];

// Assigning a value to the second index of the first array
#a_multi_array[0][1] = 5;
```

## Constant variables

To make a variable constant, you can use the `const` keyword after the `define` keyword. This will make the variable immutable, meaning that you can't change the value of the variable after it has been assigned. You can still keep it initially unassigned, but you can't assign a new value to it once it has been assigned.

### Const example

```ts
define const string #a_string = "Hello World!";

// This will throw an error
#a_string = "Hello Universe!";

// For now this will be null until a value is assigned to it
define const string #hello_message;
define const boolean #is_universal = true;

if (#is_universal) {
  // Now the variable will permanently be "Hello Universe!"
  #hello_message = "Hello Universe!";
} else {
  #hello_message = "Hello World!";
}

// This will throw an error
#hello_message = "Hello Mars!";
```
