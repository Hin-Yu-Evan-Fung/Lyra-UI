

import { Chessground } from 'chessground';
import type { Api } from 'chessground/api';
import type { Key } from 'chessground/types';
import { engine, game } from './stores';
import { get } from 'svelte/store';
import { updateGameState } from './utils';

function movePlayed(from: Key, to: Key) {
  const g = get(game);
  const e = get(engine);

  if (!g) return;

  g.move(from, to);

  if (g.autoReply)
    e?.goMoveTime(1000);
}

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
          after: (from: Key, to: Key) => movePlayed(from, to)
        }
      }
    });

    const ro = new ResizeObserver(() => this.#cg?.redrawAll());
    ro.observe(el);

    updateGameState();
  }

  update(): void {
    const g = get(game);
    const turn = g?.turn === 'w' ? 'white' : 'black';

    this.#cg?.set({
      fen: g?.fen,
      turnColor: turn,
      movable: {
        color: turn,
        dests: g?.dests()
      }
    });
  }

  flip() {
    this.#cg?.toggleOrientation();
  }

  destroy(): void {
    this.#cg?.destroy();
  }
}


