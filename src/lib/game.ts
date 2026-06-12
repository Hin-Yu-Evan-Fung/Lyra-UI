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
    try {
      const m = this.#chess.move({ from, to });
      updateGameState();
      game.set(this);
      return m;
    } catch (e) {
      // Sliently ignore invalid moves
      console.log("Illegal Engine Move! Skipping!");
    }
  }

  get fen() { return this.#chess.fen(); }
  get history() { return this.#chess.history(); }
  get history_verbose() { return this.#chess.history({ verbose: true }); }
  get isOver(): boolean { return this.#chess.isGameOver(); }
  get isDraw(): boolean { return this.#chess.isDraw(); }
  get isCheckmate(): boolean { return this.#chess.isCheckmate(); }
  get isStalemate(): boolean { return this.#chess.isStalemate(); }
  get turn(): string { return this.#chess.turn(); }

  get gameStatus(): string {
    if (this.#chess.isCheckmate())
      return this.#chess.turn() === 'w' ? 'Black wins' : 'White wins';
    if (this.#chess.isStalemate()) return 'Draw by stalemate';
    if (this.#chess.isInsufficientMaterial()) return 'Draw by insufficient material';
    if (this.#chess.isThreefoldRepetition()) return 'Draw by repetition';
    if (this.#chess.isDraw()) return 'Draw by 50 move rule';
    return '';
  }

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
    updateGameState();
  }

  takeBack(): void {
    this.#chess.undo();
    updateGameState();
    game.set(this);
  }
}

