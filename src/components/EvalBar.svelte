<script lang="ts">
  import { depthInfo, game } from "../lib/stores";
  import { EvalMateBound } from "../lib/utils";

  function evalToPercent(eval_: number): number {
    const e = $game?.turn == "w" ? eval_ : -eval_;

    if (e >= EvalMateBound) return 100;
    if (e <= -EvalMateBound) return 0;
    return 50 + 50 * Math.tanh(e / 600);
  }

  $: percent = $depthInfo ? evalToPercent($depthInfo.eval_) : 50;
</script>

<div
  class="flex flex-col h-full w-4 rounded overflow-hidden relative self-stretch"
>
  <!-- black side -->
  <div
    class="bg-gray-200 transition-all duration-300"
    style="height: {100 - percent}%"
  ></div>
  <!-- white side -->
  <div class="bg-gray-800 flex-1"></div>
</div>
