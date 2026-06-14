<script lang="ts">
  import { depthInfo } from "../lib/stores";
  import { EvalMateBound } from "../lib/utils";

  function evalToPercent(v: number): number {
    if (v >= EvalMateBound) return 100;
    if (v <= -EvalMateBound) return 0;
    return 50 + 50 * Math.tanh(v / 1200);
  }

  $: percent = $depthInfo ? evalToPercent($depthInfo.normalised) : 50;
</script>

<div
  class="flex flex-col h-full w-4 rounded overflow-hidden relative self-stretch"
>
  <!-- black side -->
  <div
    class="bg-gray-200 transition-all duration-300"
    style="height: {percent}%"
  ></div>
  <!-- white side -->
  <div class="bg-gray-800 flex-1"></div>
</div>
