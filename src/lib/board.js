

import { Chessground } from 'chessground';
import { getChess, makeMove } from './game.js';

import 'chessground/assets/chessground.base.css';
import 'chessground/assets/chessground.brown.css';
import 'chessground/assets/chessground.cburnett.css';

let cg = null;

export function initBoard(el) {
  cg = Chessground(el, {
    movable: {
      color: 'white',
      free: false,
      dests: toDests(),
      events: {
        after: (from, to) => {
          makeMove(from, to);
          update();
        }
      }
    }
  });
  return cg;
}

export function toDests() {
  const chess = getChess();
  const dests = new Map();
  for (const square of chess.board().flat()) {
      if (!square || square.color !== chess.turn()) continue;
      const moves = chess.moves({ square: square.square, verbose: true });
      if (moves.length) {
          dests.set(square.square, moves.map(m => m.to));
      }
  }
  return dests;
}

export function update() {
  const chess = getChess();
  cg.set({
      fen: chess.fen(),
      turnColor: chess.turn() === 'w' ? 'white' : 'black',
      movable: {
          color: chess.turn() === 'w' ? 'white' : 'black',
          dests: toDests()
      }
  });
}
