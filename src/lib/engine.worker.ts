
import type { LyraWasmInstance } from './LyraWasm';
import LyraWasmFactory from './LyraWasm';

let engine: LyraWasmInstance | null = null;

async function init() {
  const Module = await LyraWasmFactory();
  Module.initialise();
  engine = new Module.LyraWasm();

  engine.onBestMove((move) => {
    postMessage({ type: 'bestmove', move });
  });

  engine.onDepthFinished((depth, seldepth, eval_, time, nodes, nps, hashfull, pv) => {
    postMessage({ type: 'depthinfo', depth, seldepth, eval_, time, nodes, nps, hashfull, pv });
  });

  postMessage({ type: 'ready' });
}

self.onmessage = (e) => {
  const { type, ...data } = e.data;
  switch (type) {
    case 'init': init(); break;
    case 'setPosition': engine?.setPosition(data.fen); break;
    case 'goMoveTime': console.log('goMovetime', data.ms); engine?.goMoveTime(data.ms); break;
    case 'goDepth': engine?.goDepth(data.depth); break;
    case 'goTime': engine?.goTime(data.wtime, data.btime, data.winc, data.binc); break;
    case 'goInfinite': engine?.goInfinite(); break;
  }
}

self.onerror = (e) => {
  console.error('Worker error:', e);
};
