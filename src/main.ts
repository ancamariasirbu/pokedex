import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
  try {
    const state = initState();
    startREPL(state);
  } catch (err) {
    console.error("Fatal error:", err);
    process.exit(1);
  }
}

main();
