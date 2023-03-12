Feature: Trimmed data reader test

  Scenario: Parse a piece of data with trimmable data prepended
    Given the following lines:
      | test |
      |  test |
      | /* comment */test |
      | /* comment */ test |
      | /* comment */\n //test\ntest |
    When "test" is read
    Then all matches are found
    And all offsets are at the end of the input data
    And all checkpoints are cleaned up

  Scenario: Set a checkpoint and use the checkpoint after parsing
    Given the following lines:
      | test |
      |  test |
      | /* comment */test |
      | /* comment */ test |
      | /* comment */\n //test\ntest |
    And a checkpoint is set
    When "test" is read
    And the last set checkpoint is used
    Then all matches are found
    And all offsets are at the start of the input data
    And all checkpoints are cleaned up