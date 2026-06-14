import { get } from "svelte/store";
import { board, currentFen, engine, game, gameStatus, searchConfig, showPromotion } from "./stores";
import type { Key } from "chessground/types";

const MaxDepth = 256;
export const EvalMate = 29000;
export const EvalMateBound = EvalMate - MaxDepth;

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

  if (g)
    e?.setPosition(g?.fen);

  gameStatus.set(g?.gameStatus || "");
  currentFen.set(g?.fen || startPosFen);

  b?.update();
}

export function handleMove(from: Key, to: Key) {
  const g = get(game);
  const b = get(board);

  if (!g) return;

  const isPromotion = g.isPawnPromotion(from, to);

  if (isPromotion) {
    b?.lock();
    showPromotion.set({
      from,
      to,
      color: g.turn
    });
    return;
  }

  completeMove(from, to);
}

export function completeMove(from: Key, to: Key, promotion?: string) {
  const g = get(game);
  if (!g) return;

  g.move(from, to, promotion);

  if (g.autoReply)
    engineGo();

}

export function engineGo() {
  const c = get(searchConfig);
  const e = get(engine);

  switch (c.mode) {
    case "movetime":
      e?.goMoveTime(c.movetime);
      break;
    case "depth":
      e?.goDepth(c.depth);
      break;
    case "infinite":
      e?.goInfinite();
      break;
  }
}


