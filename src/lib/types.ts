export type BestMoveCallback = (move: string) => void;

export type DepthInfoCallback = (
  depth: number,
  seldepth: number,
  eval_: number,
  time: number,
  nodes: number,
  nps: number,
  hashfull: number,
  pv: string
) => void;


