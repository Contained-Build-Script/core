Feature: Lexer test

  Scenario: No tokens overlap
    Given the lexer order
    Then the tokens do not overlap

  Scenario: Give a script and read out the resulting tokens
    Given the code "define const int a = 1;"
    When running the lexer
    Then the tokens are:
      | token       | type            | data_type  |
      | define      | KEYWORD         | DEFINE     |
      | const       | KEYWORD         | CONSTANT   |
      | int         | VARIABLE_INFO   | INT        |
      | a           | VARIABLE        | IDENTIFIER |
      | =           | ASSIGN_OPERATOR | ASSIGNMENT |
      | 1           | VALUE           | NUMBER     |
      | ;           | CONTEXT         | LINE_END   |
