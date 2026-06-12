import { Chess } from 'chess.js';
import type { Key } from 'chessground/types';
import { updateGameState } from './utils';
import { game } from './stores';

export class Game {
  #chess = new Chess();
  autoReply = false;

  toggleAutoReply() {
    this.autoReply = !this.autoReply;
    game.set(this);
  }

  load(fen: string) {
    this.#chess.load(fen);
    updateGameState();
    game.set(this);
  }

  move(from: Key, to: Key) {
    const m = this.#chess.move({ from, to });
    updateGameState();
    game.set(this);
    return m;
  }

  get fen() { return this.#chess.fen(); }
  get history() { return this.#chess.history(); }
  get turn() { return this.#chess.turn(); }
  get isOver() { return this.#chess.isGameOver(); }

  dests() {
    const dests = new Map();
    for (const square of this.#chess.board().flat()) {
      if (!square || square.color !== this.#chess.turn()) continue;
      const moves = this.#chess.moves({ square: square.square, verbose: true });
      if (moves.length) dests.set(square.square, moves.map(m => m.to));
    }
    return dests;
  }

  reset() { this.#chess = new Chess(); }

  playMove(move: string): void {
    const from = move.slice(0, 2) as Key;
    const to = move.slice(2, 4) as Key;
    this.move(from, to);
  }
}

