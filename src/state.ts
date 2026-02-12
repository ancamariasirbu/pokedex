import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands_registry.js";
import readline from "readline";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
};

export function initState(): State {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands = getCommands();

  return {
    rl,
    commands,
  };
}
