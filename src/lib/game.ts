import { Chess } from 'chess.js';

export class Game {
  #chess = new Chess();

  move(from: string, to: string) {
    return this.#chess.move({ from, to });
  }

  get fen() { return this.#chess.fen(); }
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
}

