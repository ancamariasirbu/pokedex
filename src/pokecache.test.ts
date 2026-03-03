import { Cache } from "./pokecache.js";
import { describe, expect, test } from "vitest";

describe.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500,
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000,
  },
  {
    key: "https://example.com/other",
    val: "extradata",
    interval: 250,
  },
])("Test Caching $interval ms", ({ key, val, interval }) => {
  test("item should be in cache right after adding", () => {
    const cache = new Cache<string>(interval);
    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);
    cache.stopReapLoop();
  });

  test("item should be gone after the interval expires", async () => {
    const cache = new Cache<string>(interval);
    cache.add(key, val);
    await new Promise((resolve) => setTimeout(resolve, interval * 2));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);
    cache.stopReapLoop();
  });
});
