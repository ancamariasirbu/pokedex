import readline from "readline";
import { getCommands } from "./commands_registry.js";


export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/);
};


export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands = getCommands();
  rl.prompt();

  rl.on("line", (input: string) => {
    const words = cleanInput(input);

  const commandName = words[0];
  const command = commands[commandName];


   if (command) {
      try {
        command.callback(commands); // pass registry to callback
      } catch (err) {
        console.error("Error running command:", err);
      }
    } else {
      console.log("Unknown command");
    }
    
    rl.prompt();
  });
}