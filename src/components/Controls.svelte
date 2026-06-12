<script lang="ts">
  import { engine, game, gameStatus, searchConfig } from "../lib/stores";
  import { engineGo } from "../lib/utils";

  function takeBack() {
    $game?.takeBack();
    $engine?.stop();
  }

  function toggleAutoReply() {
    $game?.toggleAutoReply();
  }
</script>

<div class="flex flex-col gap-2">
  <div class="min-h-8">
    {#if $searchConfig.mode === "movetime"}
      <input
        type="number"
        bind:value={$searchConfig.movetime}
        class="bg-gray-700 rounded px-2 py-1 w-full"
        placeholder="ms"
      />
    {:else if $searchConfig.mode === "depth"}
      <input
        type="number"
        bind:value={$searchConfig.depth}
        class="bg-gray-700 rounded px-2 py-1 w-full"
        placeholder="depth"
      />
    {/if}
  </div>

  <div class="flex gap-2">
    <button
      class="flex-1 p-1 rounded hover:bg-blue-500 {$searchConfig.mode ===
      'movetime'
        ? 'bg-blue-600'
        : 'bg-gray-700'}"
      onclick={() => ($searchConfig.mode = "movetime")}>Time</button
    >
    <button
      class="flex-1 p-1 rounded hover:bg-blue-500 {$searchConfig.mode ===
      'depth'
        ? 'bg-blue-600'
        : 'bg-gray-700'}"
      onclick={() => ($searchConfig.mode = "depth")}>Depth</button
    >
    <button
      class="flex-1 p-1 rounded hover:bg-blue-500 {$searchConfig.mode ===
      'infinite'
        ? 'bg-blue-600'
        : 'bg-gray-700'}"
      onclick={() => ($searchConfig.mode = "infinite")}>∞</button
    >
  </div>

  <div class="grid grid-cols-2 gap-2">
    <button
      onclick={engineGo}
      class="bg-green-600 rounded py-1 w-full"
      class:grayscale={$gameStatus}
      class:opacity-60={$gameStatus}
      disabled={!!$gameStatus}>Go</button
    >
    <button
      onclick={takeBack}
      class="bg-gray-600 rounded py-1 w-full hover:bg-gray-500"
    >
      Takeback
    </button>
    <button
      onclick={() => $engine?.stop()}
      class="bg-red-600 rounded py-1 w-full">Stop</button
    >
    <button
      onclick={toggleAutoReply}
      class="w-full px-4 py-0.5 gap-3 rounded font-semibold text-sm border transition flex items-center justify-between
    {$game?.autoReply
        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400 hover:bg-emerald-600/30'
        : 'bg-neutral-900/50 border-neutral-700 text-neutral-400 hover:bg-neutral-900'}"
      ><span>AutoReply</span>
      <span
        class="text-xs uppercase font-bold tracking-wider px-1.5 py-0.5 rounded {$game?.autoReply
          ? 'bg-emerald-500 text-neutral-950'
          : 'bg-neutral-700 text-neutral-400'}"
      >
        {$game?.autoReply ? "ON" : "OFF"}
      </span>
    </button>
  </div>
</div>
