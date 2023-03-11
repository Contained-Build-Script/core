Feature: Trimmed data reader test

  Scenario: Parse a piece of data with a space appended
    Given the following lines:
      |  test |
      | /* comment */test |
      | /* comment */ test |
      | /* comment */\n//test\ntest |
    When "test" is read
    Then all matches are found
    And all offsets are at the end of the input data
    And all checkpoints are cleaned up