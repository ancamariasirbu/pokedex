import { Cache } from "./pokecache";

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache<ShallowLocations>;

  constructor() {
    this.cache = new Cache<ShallowLocations>(5 * 60 * 1000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

    const cached = this.cache.get(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url);
    const data = await response.json();
    this.cache.add(url, data);
    return data;
  }
}
