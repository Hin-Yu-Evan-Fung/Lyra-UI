
import type { BestMoveCallback, DepthInfoCallback } from './types';


export class Engine {
  #worker: Worker | null = null;
  #onBestMove: BestMoveCallback | null = null;
  #onDepthFinished: DepthInfoCallback | null = null;

  async init(): Promise<void> {
    return new Promise((resolve) => {
      this.#worker = new Worker(
        new URL('./engine.worker.ts', import.meta.url),
        { type: 'module' }
      );

      this.#worker.onmessage = (e) => {
        const { type, ...data } = e.data;
        switch (type) {
          case 'ready':
            resolve();
            break;
          case 'bestmove':
            this.#onBestMove?.(data.move);
            break;
          case 'depthinfo':
            this.#onDepthFinished?.(data.depth, data.seldepth, data.eval_,
              data.time, data.nodes, data.nps, data.hashfull, data.pv);
            break;
        }
      };

      this.#worker.postMessage({ type: 'init' });
    });
  }

  onBestMove(cb: BestMoveCallback): void { this.#onBestMove = cb; }
  onDepthFinished(cb: DepthInfoCallback): void { this.#onDepthFinished = cb; }
  setPosition(fen: string): void { this.#worker?.postMessage({ type: 'setPosition', fen }); }
  goMoveTime(ms: number): void { this.#worker?.postMessage({ type: 'goMoveTime', ms }); }
  goDepth(depth: number): void { this.#worker?.postMessage({ type: 'goDepth', depth }); }
  goInfinite(): void { this.#worker?.postMessage({ type: 'goInfinite' }); }
  goTime(wtime: number, btime: number, winc: number, binc: number) { this.#worker?.postMessage({ type: 'goTime', wtime, btime, winc, binc }); }
  stop(): void { this.#worker?.postMessage({ type: 'stop' }); }
}

