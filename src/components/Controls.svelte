<script lang="ts">
  import { engine, game } from "../lib/stores";

  let movetime = 1000;
  let depth = 10;
  let mode: "movetime" | "depth" | "infinite" = "movetime";

  function go() {
    switch (mode) {
      case "movetime":
        $engine?.goMoveTime(movetime);
        break;
      case "depth":
        $engine?.goDepth(depth);
        break;
      case "infinite":
        $engine?.goInfinite();
        break;
    }
  }

  function toggleAutoReply() {
    $game?.toggleAutoReply();
  }
</script>

<div class="flex flex-col gap-2">
  <div class="min-h-8">
    {#if mode === "movetime"}
      <input
        type="number"
        bind:value={movetime}
        class="bg-gray-700 rounded px-2 py-1 w-full"
        placeholder="ms"
      />
    {:else if mode === "depth"}
      <input
        type="number"
        bind:value={depth}
        class="bg-gray-700 rounded px-2 py-1 w-full"
        placeholder="depth"
      />
    {/if}
  </div>

  <div class="flex gap-2">
    <button
      class="flex-1 p-1 rounded hover:bg-blue-500 {mode === 'movetime'
        ? 'bg-blue-600'
        : 'bg-gray-700'}"
      onclick={() => (mode = "movetime")}>Time</button
    >
    <button
      class="flex-1 p-1 rounded hover:bg-blue-500 {mode === 'depth'
        ? 'bg-blue-600'
        : 'bg-gray-700'}"
      onclick={() => (mode = "depth")}>Depth</button
    >
    <button
      class="flex-1 p-1 rounded hover:bg-blue-500 {mode === 'infinite'
        ? 'bg-blue-600'
        : 'bg-gray-700'}"
      onclick={() => (mode = "infinite")}>∞</button
    >
  </div>

  <div class="flex gap-2">
    <button onclick={go} class="bg-green-600 rounded py-1 w-full">Go</button>
    <button
      onclick={toggleAutoReply}
      class="w-full py-2 px-4 rounded font-semibold text-sm border transition flex items-center justify-between
    {$game?.autoReply
        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400 hover:bg-emerald-600/30'
        : 'bg-neutral-900/50 border-neutral-700 text-neutral-400 hover:bg-neutral-900'}"
      ><span>Automatic Engine Reply</span>
      <span
        class="text-xs uppercase font-bold tracking-wider px-1.5 py-0.5 rounded {$game?.autoReply
          ? 'bg-emerald-500 text-neutral-950'
          : 'bg-neutral-700 text-neutral-400'}"
      >
        {$game?.autoReply ? "ON" : "OFF"}
      </span>
    </button>
  </div>
  <button onclick={() => $engine?.stop()} class="bg-red-600 rounded py-1 w-full"
    >Stop</button
  >
</div>
