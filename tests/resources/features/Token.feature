Feature: Token test

  Scenario: Create several tokens with a static string parser and parse a piece of text
    Given string parser tokens with the following info:
      | parser | type     | force_space |
      | this   | VARIABLE | true        |
      | is     | VARIABLE | true        |
      | some   | VARIABLE | true        |
      | text   | VARIABLE | true        |
      | to     | VARIABLE | true        |
      | test   | VARIABLE | false       |
    And a data parser with "this is some text to test" as data
    When parsing the data in order
    Then all tokens should be valid
    And the tokens should be:
      | this  |
      | is    |
      | some  |
      | text  |
      | to    |
      | test  |

  Scenario: Create several value tokens with static parsers to parse different types out of a piece of text
    Given regex parser value tokens with the following info:
      | parser      | type    | force_space |
      | true\|false | BOOLEAN | true        |
      | \\d+        | INT     | true        |
      | \\d+\\.\\d+ | FLOAT   | true        |
      | null        | NULL    | false       |
    And a data parser with "true 20 20.20 null" as data
    When parsing the data in order
    Then all tokens should be valid
    And the tokens and types should be:
      | value | type    |
      | true  | boolean |
      | 20    | number  |
      | 20.20 | number  |
      | null  | null    |
