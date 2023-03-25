<img align="left" width="100px" src="https://contained-build-script.github.io/core/favicon.ico">

# Home

<br>

Welcome to CBS! A simple C and Shell based scripting language made to simplify building complex projects. This language aims to be easy to pick up and use, while still being powerful enough to allow you to build any complex projects. CBS comes with built-in command line access to freely extend the functionality of the language.

## Preview

```ts
/*
  A simple TypeScript project build script.
  Goals:
    - Build the project
    - Pack the project
    - Remove the "dist" build directory
*/

// This will return and store the OS name.
define const string #os = os_name();

// #* is reserved to contain provided arguments.
build(#*[0]);

// Since the remove command is OS specific, we used the earlier provided OS variable.
if (#os == "Ubuntu") {
    execute("rm -rf dist");
} else if (#os == "Windows") {
    execute("rmdir /s /q dist");
} else {
    throw "Unsupported OS";
}

define function build(define const string #configs) {
    execute("tsc");
    execute("npx webpack" with "--config " + #configs);
}
```

## Getting Started

Wait for the initial release of CBS...

## Documentation

This page comes with in depth documentations about the language. You can find it [here](wiki).
