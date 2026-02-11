import readline from "readline";


export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/);
}

export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

    rl.prompt();

  rl.on("line", (input: string) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    console.log(`Your command was: ${words[0]}`);
    rl.prompt();
  });
}