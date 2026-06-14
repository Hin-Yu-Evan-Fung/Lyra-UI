

import { Chessground } from 'chessground';
import type { Api } from 'chessground/api';
import type { Key, Piece } from 'chessground/types';
import { boardHeight, game, gameStatus } from './stores';
import { get } from 'svelte/store';
import { handleMove, updateGameState } from './utils';

export class Board {
  #cg: Api | null = null;

  init(el: HTMLElement): void {
    const g = get(game);
    this.#cg = Chessground(el, {
      movable: {
        color: 'white',
        free: false,
        dests: g?.dests(),
        events: {
          after: (from: Key, to: Key) => handleMove(from, to)
        }
      }
    });

    const ro = new ResizeObserver((entries) => {
      boardHeight.set(entries[0].contentRect.height)
      this.#cg?.redrawAll();
    });

    ro.observe(el);

    updateGameState();
  }

  update(): void {
    const g = get(game);
    const turn = g?.turn === 'w' ? 'white' : 'black';
    const over = !!get(gameStatus);

    let lastMove = undefined;

    if (g) {
      const hist = g.history_verbose;
      const last = hist[hist.length - 1];
      lastMove = hist.length > 1 ? [last.from, last.to] : undefined;
    }

    this.#cg?.set({
      fen: g?.fen,
      turnColor: turn,
      lastMove: lastMove,
      selected: undefined,
      movable: {
        color: over ? undefined : turn,
        dests: over ? new Map() : g?.dests()
      },
    });
  }

  flip() {
    this.#cg?.toggleOrientation();
  }

  destroy(): void {
    this.#cg?.destroy();
  }

  showArrow(move: string): void {
    const from = move.slice(0, 2) as Key;
    const to = move.slice(2, 4) as Key;
    this.#cg?.setShapes([{
      orig: from,
      dest: to,
      brush: 'green'
    }]);
  }

  lock() {
    this.#cg?.set({ movable: { color: undefined, dests: new Map() } });
  }
}


