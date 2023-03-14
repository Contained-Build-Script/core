Feature: Token test

  Scenario: Create several tokens with a static string parser and parse a piece of text
    Given tokens with the following info:
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
