const EvalMate = 32000;
const EvalMateBound = 31000;

export function formatEval(v: number): string {
  if (v >= EvalMateBound)
    return `mate ${Math.floor((EvalMate - v + 1) / 2)}`;
  else if (v <= -EvalMateBound)
    return `mate ${Math.floor((-EvalMate - v - 1) / 2)}`;
  else
    return `cp ${Math.floor(v / 2)}`;
}
