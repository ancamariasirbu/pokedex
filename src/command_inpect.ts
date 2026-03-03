import { State } from "./state.js";

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  const pokemonName = args[0];

  if (!pokemonName) {
    console.log("Please specify a Pokémon name to inspect.");
    return;
  }

  const pokemon = state.pokedex[pokemonName.toLowerCase()];

  if (!pokemon) {
    console.log(
      `${pokemonName} is not in your pokedex. Try catching it first!`,
    );
    return;
  }

  console.log(`Name: ${pokemon.name}`);
  console.log(`Base Experience: ${pokemon.base_experience}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  pokemon.stats.forEach((stat) => {
    console.log(`- ${stat.stat.name}: ${stat.base_stat}`);
  });
  console.log("Types:");
  pokemon.types.forEach((typeInfo) => {
    console.log(`- ${typeInfo.type.name}`);
  });
}
