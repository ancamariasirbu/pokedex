import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
  const pokedexEntries = Object.values(state.pokedex);

  if (pokedexEntries.length === 0) {
    console.log("Your pokedex is empty.");
    return;
  }

  console.log("Your Pokedex:");
  pokedexEntries.forEach((pokemon) => {
    console.log(`- ${pokemon.name}`);
  });
}
