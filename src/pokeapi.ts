import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache<ShallowLocations | LocationArea>;

  constructor() {
    this.cache = new Cache<ShallowLocations | LocationArea>(5 * 60 * 1000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

    const cached = this.cache.get(url);
    if (cached) {
      return cached as ShallowLocations;
    }

    const response = await fetch(url);
    const data = await response.json();
    this.cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<LocationArea> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get(url);
    if (cached) {
      return cached as LocationArea;
    }

    const response = await fetch(url);
    const data = await response.json();
    this.cache.add(url, data);
    return data;
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type LocationArea = {
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};
