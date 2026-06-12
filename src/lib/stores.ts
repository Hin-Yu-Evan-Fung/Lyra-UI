import { writable } from "svelte/store";
import type { Engine } from "./engine";
import type { Game } from "./game";
import type { Board } from "./board";
import { startPosFen } from "./utils";

export interface DepthInfo {
  depth: number;
  seldepth: number;
  eval_: number;
  time: number;
  nodes: number;
  nps: number;
  hashfull: number;
  pv: string;
}

export const game = writable<Game | null>(null);
export const engine = writable<Engine | null>(null);
export const board = writable<Board | null>(null);
export const boardHeight = writable<number>(0);
export const depthInfo = writable<DepthInfo | null>(null);

export const searchConfig = writable({
  mode: 'movetime' as 'movetime' | 'depth' | 'infinite',
  movetime: 1000,
  depth: 10
});

export const gameStatus = writable<string>('');
export const currentFen = writable<string>(startPosFen);
