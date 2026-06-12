<script>
  import { game } from "../lib/stores";

  // Build a single, fully formed PGN string whenever $game updates
  // e.g., "1. e4 e5 2. Nf3 Nc6"
  $: pgnText = (() => {
    const history = $game?.history || [];
    let pgnString = "";

    for (let i = 0; i < history.length; i += 2) {
      const moveNumber = Math.floor(i / 2) + 1;
      const whiteMove = history[i];
      const blackMove = history[i + 1] || "";

      pgnString += `${moveNumber}. ${whiteMove} ${blackMove} `.trim() + " ";
    }
    return pgnString.trim();
  })();
</script>

<div
  class="bg-neutral-800 p-3 rounded border border-neutral-700 h-full flex flex-1 flex-col gap-1.5 w-full"
>
  <div
    class="text-xs text-neutral-400 font-bold uppercase tracking-wider select-none"
  >
    Move History
  </div>

  <div
    class="flex-1 overflow-y-auto pr-1 font-mono text-xs text-neutral-200 leading-relaxed max-h-20 scrollbar-thin select-text whitespace-normal break-words"
  >
    {#if !pgnText}
      <span class="text-neutral-500 italic select-none"
        >No moves recorded. Start playing!</span
      >
    {:else}
      {pgnText}
    {/if}
  </div>
</div>
