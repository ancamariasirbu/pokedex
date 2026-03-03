import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inpect.js";
import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays locations of pokemons",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays previous locations of pokemons",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "Explores a location area and lists its Pokemon",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Attempts to catch a Pokemon by name",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspects a Pokémon in the pokedex",
      callback: commandInspect,
    },
  };
}
