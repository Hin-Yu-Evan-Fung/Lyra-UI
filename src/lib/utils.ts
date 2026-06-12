import { get } from "svelte/store";
import { board, engine, game } from "./stores";

const EvalMate = 32000;
const EvalMateBound = 31000;

export const startPosFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export function formatEval(v: number): string {
  if (v >= EvalMateBound)
    return `#${Math.floor((EvalMate - v + 1) / 2)}`;
  else if (v <= -EvalMateBound)
    return `#${Math.floor((-EvalMate - v - 1) / 2)}`;
  else
    return `${(v / 200).toFixed(1)}`;
}

export function normaliseFen(fen: string): string {
  const fields = fen.trim().split(/\s+/);
  const defaults = [
    'w',
    'KQkq',
    '-',
    '0',
    '1'
  ];

  for (let i = fields.length; i < 6; i++) {
    fields.push(defaults[i - 1]);
  }

  return fields.join(' ');
}

export function updateGameState() {
  const b = get(board);
  const g = get(game);
  const e = get(engine);

  b?.update();
  if (g)
    e?.setPosition(g?.fen);
}
