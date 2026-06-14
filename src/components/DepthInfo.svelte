<script lang="ts">
  import { depthInfo } from "../lib/stores";
  import { formatEval } from "../lib/utils";
</script>

{#if $depthInfo}
  <div
    class="bg-gray-800 flex flex-col gap-4 min-w-90 shrink-0 rounded-lg p-3 font-mono text-sm"
  >
    <table class="w-full board-separate board-spacing-y-1">
      <thead>
        <tr class="text-gray-400 text-xs">
          <th class="w-8 text-center pr-3">Depth</th>
          <th class="w-8 text-center pr-3">Sel</th>
          <th class="w-8 text-center pr-3">Time</th>
          <th class="w-8 text-center pr-3">Score</th>
          <th class="w-16 text-center pr-3">Nodes</th>
          <th class="w-16 text-center pr-3">NPS</th>
          <th class="w-16 text-center pr-3">Hash</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-white">
          <td class="text-center pr-3">{$depthInfo.depth}</td>
          <td class="text-center pr-3">{$depthInfo.seldepth}</td>
          <td class="text-center pr-3"
            >{($depthInfo.time / 1000).toFixed(1)}s</td
          >
          <td class="text-center pr-3">{formatEval($depthInfo.normalised)}</td>
          <td class="text-center pr-3"
            >{($depthInfo.nodes / 1000000).toFixed(1)}M</td
          >
          <td class="text-center pr-3"
            >{($depthInfo.nps / 1000000).toFixed(1)}M</td
          >
          <td class="text-center pr-3">{$depthInfo.hashfull / 10}%</td>
        </tr>
      </tbody>
    </table>
    <div class="text-gray-300 text-xs break-words">
      PV: {$depthInfo.pv}
    </div>
  </div>
{:else}
  <div class="text-gray-500 text-sm min-w-90 text-center">No search data</div>
{/if}
