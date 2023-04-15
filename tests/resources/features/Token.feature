Feature: Token test

  Scenario: Create several tokens with a static string parser and parse a line of code
    Given string parser tokens with the following info:
      | token   | type            | data_type  |
      | def     | KEYWORD         | DEFINE     |
      | string  | VARIABLE        | IDENTIFIER |
      | value   | VARIABLE        | IDENTIFIER |
      | =       | ASSIGN_OPERATOR | ASSIGNMENT |
      | "value" | VALUE           | STRING     |
      | ;       | CONTEXT         | LINE_END   |
    And a data parser with "def string value = \"value\";" as data
    When parsing the data in order
    Then all tokens should be valid
    And the tokens should be:
      | value   | has_trailing_whitespace | index |
      | def     | true                    | 0     |
      | string  | true                    | 4     |
      | value   | true                    | 11    |
      | =       | true                    | 17    |
      | "value" | false                   | 19    |
      | ;       | false                   | 26    |

  Scenario: Create several tokens with a regex parser and parse a line of code
    Given regex parser tokens with the following info:
      | token       | type            | data_type  |
      | def         | KEYWORD         | DEFINE     |
      | const       | KEYWORD         | CONSTANT   |
      | bool        | VARIABLE        | IDENTIFIER |
      | value       | VARIABLE        | IDENTIFIER |
      | =           | ASSIGN_OPERATOR | ASSIGNMENT |
      | (["']).*?\1 | VALUE           | STRING     |
      | ={2}        | OPERATOR        | EQUAL      |
      | (["']).*?\1 | VALUE           | STRING     |
      | ;           | CONTEXT         | LINE_END   |
    And a data parser with "def const bool value = \"value\" == 'test';" as data
    When parsing the data in order
    Then all tokens should be valid
    And the tokens should be:
      | value   | has_trailing_whitespace | index |
      | def     | true                    | 0     |
      | const   | true                    | 4     |
      | bool    | true                    | 10    |
      | value   | true                    | 15    |
      | =       | true                    | 21    |
      | "value" | true                    | 23    |
      | ==      | true                    | 31    |
      | 'test'  | false                   | 34    |
      | ;       | false                   | 40    |
