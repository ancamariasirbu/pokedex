export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache<T> {
  #cache = new Map<string, CacheEntry<T>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }


  add(key: string, val: T): void {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val,
    };

    this.#cache.set(key, entry);
  }

  get(key: string): T | undefined {
    const entry = this.#cache.get(key);
    if (!entry) {
      return undefined;
    }

    return entry.val;
  }

  #reap(): void {
    const now = Date.now();
    for (const [key, entry] of this.#cache.entries()) {
      const age = now - entry.createdAt;

      if (age > this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopReapLoop(): void {
    if (this.#reapIntervalId) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}
