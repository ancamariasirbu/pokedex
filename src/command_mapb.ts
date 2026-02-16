import type { State } from "./state.js";

export async function commandMapBack(state: State): Promise<void> {
  if (!state.prevLocationsURL) {
    console.log("you're on the first page");
    return;
  }

  const response = await state.pokeapi.fetchLocations(state.prevLocationsURL);

  for (const location of response.results) {
    console.log(location.name);
  }

  state.nextLocationsURL = response.next;
  state.prevLocationsURL = response.previous;
}
