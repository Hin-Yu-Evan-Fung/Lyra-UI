import wasm from 'vite-plugin-wasm';
import type { LyraModule, LyraWasmInstance } from './LyraWasm';
import LyraWasmFactory from './LyraWasm';

let engine: LyraWasmInstance | null = null;
let wasmModule: LyraModule | null = null;
let stopFlagAddress: number | null = null;

async function init() {
  wasmModule = await LyraWasmFactory();
  wasmModule.initialise();
  engine = new wasmModule.LyraWasm();

  stopFlagAddress = wasmModule.get_stop_flag_address();

  engine?.onBestMove((move) => {
    queueMicrotask(() => postMessage({ type: 'bestmove', move }));
  });

  engine?.onDepthFinished((depth, seldepth, eval_, time, nodes, nps, hashfull, pv) => {
    queueMicrotask(() => postMessage({ type: 'depthinfo', depth, seldepth, eval_, time, nodes: Number(nodes), nps: Number(nps), hashfull, pv }));
  });

  postMessage({ type: 'ready' });
}

self.onmessage = (e) => {
  const { type, ...data } = e.data;
  switch (type) {
    case 'init': init(); break;
    case 'setPosition': engine?.setPosition(data.fen); break;
    case 'goMoveTime': engine?.goMoveTime(data.ms); break;
    case 'goDepth': engine?.goDepth(data.depth); break;
    case 'goTime': engine?.goTime(data.wtime, data.btime, data.winc, data.binc); break;
    case 'goInfinite': engine?.goInfinite(); break;
    case 'stop':
      if (wasmModule && stopFlagAddress) wasmModule.HEAP8[stopFlagAddress] = 1;
      break;
  }
}

self.onerror = (e) => {
  console.error('Worker error:', e);
};
