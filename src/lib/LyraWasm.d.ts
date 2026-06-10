import { BestMoveCallback, DepthInfoCallback } from "./types";

export interface LyraWasmInstance {
  onBestMove(cb: BestMoveCallback): void;
  onDepthFinished(cb: DepthInfoCallback): void;
  setPosition(fen: string): void;
  goMoveTime(ms: number): void;
  goDepth(depth: number): void;
  goTime(wtime: number, btime: number, winc: number, binc: number): void;
  goInfinite(): void;
  formatEval(eval_: number): string;
}

export interface LyraModule {
  initialise(): void;
  LyraWasm: new () => LyraWasmInstance;
}

declare const LyraWasm: () => Promise<LyraModule>;
export default LyraWasm;
