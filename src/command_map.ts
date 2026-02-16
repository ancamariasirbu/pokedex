import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  const response = await state.pokeapi.fetchLocations(
    state.nextLocationsURL ?? undefined,
  );

  for (const location of response.results) {
    console.log(location.name);
  }

  state.nextLocationsURL = response.next;
  state.prevLocationsURL = response.previous;
}
