Feature: Token test

  Scenario: Create several tokens with a static string parser and parse a line of code
    Given string parser tokens with the following info:
      | token   | type            | data_type  |
      | define  | KEYWORD         | DEFINE     |
      | string  | VARIABLE_INFO   | STRING     |
      | value   | VARIABLE        | IDENTIFIER |
      | =       | ASSIGN_OPERATOR | ASSIGNMENT |
      | "value" | VALUE           | STRING     |
      | ;       | CONTEXT         | LINE_END   |
    And a data parser with "define string value = \"value\";" as data
    When parsing the data in order
    Then all tokens should be valid
    And the tokens should be:
      | value   | has_trailing_whitespace | index |
      | define  | true                    | 0     |
      | string  | true                    | 7     |
      | value   | true                    | 14    |
      | =       | true                    | 20    |
      | "value" | false                   | 22    |
      | ;       | false                   | 29    |

  Scenario: Create several tokens with a regex parser and parse a line of code
    Given regex parser tokens with the following info:
      | token       | type            | data_type  |
      | define      | KEYWORD         | DEFINE     |
      | const       | KEYWORD         | CONSTANT   |
      | bool        | VARIABLE_INFO   | BOOLEAN    |
      | value       | VARIABLE        | IDENTIFIER |
      | =           | ASSIGN_OPERATOR | ASSIGNMENT |
      | (["']).*?\1 | VALUE           | STRING     |
      | ={2}        | OPERATOR        | EQUAL      |
      | (["']).*?\1 | VALUE           | STRING     |
      | ;           | CONTEXT         | LINE_END   |
    And a data parser with "define const bool value = \"value\" == 'test';" as data
    When parsing the data in order
    Then all tokens should be valid
    And the tokens should be:
      | value   | has_trailing_whitespace | index |
      | define  | true                    | 0     |
      | const   | true                    | 7     |
      | bool    | true                    | 13    |
      | value   | true                    | 18    |
      | =       | true                    | 24    |
      | "value" | true                    | 26    |
      | ==      | true                    | 34    |
      | 'test'  | false                   | 37    |
      | ;       | false                   | 43    |
