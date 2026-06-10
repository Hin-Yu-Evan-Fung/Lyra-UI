

import { Chessground } from 'chessground';
import type { Api } from 'chessground/api';
import type { Key } from 'chessground/types';
import type { Game } from './game';
import type { Engine } from './engine';

export class Board {
  #cg: Api | null = null;
  #game: Game;
  #engine: Engine;

  constructor(game: Game, engine: Engine) {
    this.#game = game;
    this.#engine = engine;
  }

  init(el: HTMLElement): void {
    this.#cg = Chessground(el, {
      movable: {
        color: 'white',
        free: false,
        dests: this.#game.dests(),
        events: {
          after: (from: Key, to: Key) => this.#onMove(from, to)
        }
      }
    });
  }

  #onMove(from: Key, to: Key): void {
    this.#game.move(from, to);
    this.#engine.setPosition(this.#game.fen);
    this.#update();
    this.#engine.goMoveTime(5000);
  }

  #update(): void {
    const turn = this.#game.turn === 'w' ? 'white' : 'black';
    console.log(this.#game.fen)
    this.#cg?.set({
      fen: this.#game.fen,
      turnColor: turn,
      movable: {
        color: turn,
        dests: this.#game.dests()
      }
    });
  }

  playMove(move: string): void {
    const from = move.slice(0, 2) as Key;
    const to = move.slice(2, 4) as Key;
    this.#game.move(from, to);
    this.#update();
  }

  destroy(): void {
    this.#cg?.destroy();
  }
}


