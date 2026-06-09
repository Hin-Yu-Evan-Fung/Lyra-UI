
import LyraWasm from './lib/LyraWasm.js';

let engine = null;

export async function initEngine() {
  const Module = await LyraWasm();
  Module.initialise();
  engine = new Module.LyraWasm();
  return engine;
}

export function getEngine() {
  return engine;
}
