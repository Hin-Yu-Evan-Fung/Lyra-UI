import wasm from 'vite-plugin-wasm';
import type { LyraModule, LyraWasmInstance } from './LyraWasm';
import LyraWasmFactory from './LyraWasm';

let engine: LyraWasmInstance | null = null;
let wasmModule: LyraModule | null = null;
let stopFlagAddress: number | null = null;
let searchRunning = false;
let pendingSearch: (() => void) | null = null;

async function init() {
  wasmModule = await LyraWasmFactory();
  wasmModule.initialise();
  engine = new wasmModule.LyraWasm();

  stopFlagAddress = wasmModule.get_stop_flag_address();

  engine?.onBestMove((move) => {
    queueMicrotask(() => {
      postMessage({ type: 'bestmove', move });
      onSearchComplete();
    });
  });

  engine?.onDepthFinished((depth, seldepth, eval_, time, nodes, nps, hashfull, pv) => {
    queueMicrotask(() => {
      postMessage({
        type: 'depthinfo', depth, seldepth, eval_,
        time: Number(time), nodes: Number(nodes),
        nps: Number(nps), hashfull, pv
      });
    });
  });

  postMessage({ type: 'ready' });
}

function runSearch(fn: () => void) {
  searchRunning = true;
  fn();
}

function onSearchComplete() {
  searchRunning = false;
}

function stopEngine() {
  if (wasmModule && stopFlagAddress) wasmModule.HEAP8[stopFlagAddress] = 1;

}

self.onmessage = (e) => {
  const { type, ...data } = e.data;

  if (type == 'stop') {
    stopEngine();
    return;
  }

  if (searchRunning) return;

  switch (type) {
    case 'init': init(); break;
    case 'setPosition': if (!searchRunning) engine?.setPosition(data.fen); break;
    case 'goMoveTime': runSearch(() => engine?.goMoveTime(data.ms)); break;
    case 'goDepth': runSearch(() => engine?.goDepth(data.depth)); break;
    case 'goTime': runSearch(() => engine?.goTime(data.wtime, data.btime, data.winc, data.binc)); break;
    case 'goInfinite': runSearch(() => engine?.goInfinite()); break;
  }
}

self.onerror = (e) => {
  console.error('Worker error:', e);
};
