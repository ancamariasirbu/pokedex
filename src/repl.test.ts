import { cleanInput } from "./cleanInput.js";
import { describe, expect, test } from "vitest";

describe.each([
  { input: "  hello  world  ", expected: ["hello", "world"] },
  { input: "  Hello  World  ", expected: ["hello", "world"] },
  { input: "HelLo  World  ", expected: ["hello", "world"] },
  { input: "  HELLO  World  ", expected: ["hello", "world"] },
  { input: "  Hello  WorlD    ", expected: ["hello", "world"] },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);

    expected.forEach((value, index) => {
      expect(actual[index]).toBe(value);
    });
  });
});
