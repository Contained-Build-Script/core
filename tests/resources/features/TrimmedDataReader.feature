Feature: Trimmed data reader test

  Scenario: Parse a piece of data with a space appended
    Given the line " test"
    When "test" is read
    Then a match is found