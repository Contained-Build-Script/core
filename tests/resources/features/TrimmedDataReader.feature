Feature: Trimmed data reader test

  Scenario: Parse a piece of data with trimmable data prepended
    Given the following lines:
      | test                         |
      |  test                        |
      | /* comment */test            |
      | /* comment */ test           |
      | /* comment */\n //test\ntest |
    When "test" is read
    Then all matches are found
    And all offsets are at the end of the input data
    And all checkpoints are cleaned up

  Scenario: Parse a piece of data with trimmable data prepended, then repeat the process
    Given the following lines:
      | test test2                         |
      |  test test2                        |
      | /* comment */test test2            |
      | /* comment */ test test2           |
      | /* comment */\n //test\ntest test2 |
    When "test" is read
    And "test2" is read
    Then all matches are found
    And all offsets are at the end of the input data
    And all checkpoints are cleaned up

  Scenario: Set a checkpoint and use the checkpoint after parsing
    Given the following lines:
      | test                         |
      |  test                        |
      | /* comment */test            |
      | /* comment */ test           |
      | /* comment */\n //test\ntest |
    And a checkpoint is set
    When "test" is read
    And the last checkpoint is used
    Then all matches are found
    And all offsets are at the start of the input data
    And all checkpoints are cleaned up

  Scenario: Set a checkpoint before and after parsing and use the first checkpoint
    Given the following lines:
      | test                         |
      |  test                        |
      | /* comment */test            |
      | /* comment */ test           |
      | /* comment */\n //test\ntest |
    And a checkpoint is set
    When "test" is read
    And a checkpoint is set
    And the first checkpoint is used
    Then all matches are found
    And all offsets are at the start of the input data
    And all checkpoints are cleaned up

  Scenario: Set a checkpoint before and after parsing and use the last checkpoint and clean up the first
    Given the following lines:
      | test                         |
      |  test                        |
      | /* comment */test            |
      | /* comment */ test           |
      | /* comment */\n //test\ntest |
    And a checkpoint is set
    When "test" is read
    And a checkpoint is set
    And the last checkpoint is used
    And the first checkpoint is cleaned up
    Then all matches are found
    And all offsets are at the end of the input data
    And all checkpoints are cleaned up

  Scenario: A list of sentences are given and all are tested for a folling whitespace after the first parse
    Given the following lines:
      | test some basic sentence                       |
      | test/* comment */ a sentence with a comment    |
      | test// comment\na sentence with a line comment |
    When "test" is read
    Then all matches are found
    And the line is followed by a whitespace
    And all checkpoints are cleaned up
