import { writable } from "svelte/store";
import type { Engine } from "./engine";
import type { Game } from "./game";
import type { Board } from "./board";

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

export const game = writable(<Game | null>(null));
export const engine = writable(<Engine | null>(null));
export const board = writable(<Board | null>(null));
export const depthInfo = writable(<DepthInfo | null>(null));
