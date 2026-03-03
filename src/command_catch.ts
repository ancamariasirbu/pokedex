import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  const pokemonName = args[0];

  if (!pokemonName) {
    console.log("Please specify a Pokémon name to catch.");
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const response = await state.pokeapi.fetchPokemon(pokemonName.toLowerCase());

  const catchRate = 1 - response.base_experience / 635; // 635 is the highest base experience in Gen 1-3, adjust as needed
  const caught = Math.random() < catchRate;

  if (caught) {
    console.log(`${pokemonName} was caught!`);
    state.pokedex[response.name] = response;
  } else {
    console.log(`${pokemonName} escaped!`);
  }
}
