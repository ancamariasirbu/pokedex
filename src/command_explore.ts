import type { State } from "./state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  const locationName = args[0];

  if (!locationName) {
    console.log("Please provide a location name. Usage: explore <area_name>");
    return;
  }

  console.log(`Exploring ${locationName}...`);

  const response = await state.pokeapi.fetchLocation(locationName);

  console.log("Found Pokemon:");
  for (const encounter of response.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}
