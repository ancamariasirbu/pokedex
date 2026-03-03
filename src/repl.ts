import type { State } from "./state.js";
import { cleanInput } from "./cleanInput.js";

export function startREPL(state: State) {
  const rl = state.rl;
  const commands = state.commands;

  rl.prompt();

  rl.on("line", async (input: string) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = commands[commandName];

    if (command) {
      try {
        await command.callback(state, ...words.slice(1)); // pass state + args
      } catch (err) {
        console.error("Error running command:", err);
      }
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });
}
