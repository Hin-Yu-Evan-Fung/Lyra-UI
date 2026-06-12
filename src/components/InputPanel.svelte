<script>
  import { game, engine, board, currentFen } from "../lib/stores";
  import { normaliseFen, startPosFen } from "../lib/utils";

  let error = "";

  function onFenSubmit() {
    error = "";

    try {
      const normalised = normaliseFen($currentFen);
      $game.load(normalised);
      $engine.setPosition(normalised);
      $currentFen = normalised;
      error = "";
    } catch (e) {
      error = e.message || "Failed to parse FEN string.";
    }
  }

  function newGame() {
    $game.load(startPosFen);
    $engine.setPosition(startPosFen);
  }

  // Toggles a state variable on your game store to invert the board rendering orientation
  function handleFlipBoard() {
    $board.flip();
  }
</script>

<div class="flex gap-2 p-2 rounded w-full">
  <span
    class="text-xs text-neutral-400 self-center px-1 uppercase tracking-wider font-bold"
    >FEN</span
  >
  <div class="flex flex-row bg-gray-700 w-full rounded">
    <input
      type="text"
      bind:value={$currentFen}
      class="flex-1 text-sm rounded px-2 py-1 items-center focus:outline-none"
    />
    {#if error}
      <span
        class="text-xs text-red-400 font-medium px-2 flex items-center gap-1 focus:outline-none"
      >
        ⚠️ {error}
      </span>
    {/if}
  </div>
  <button
    on:click={onFenSubmit}
    class="bg-blue-600 hover:bg-blue-500 text-sm px-3 py-1.5 rounded transition"
  >
    Load
  </button>
  <button
    on:click={newGame}
    class="bg-blue-600 hover:bg-blue-500 text-sm px-3 py-1.5 rounded transition"
  >
    Reset
  </button>
  <button
    on:click={handleFlipBoard}
    title="Flip Board Perspective"
    class="bg-neutral-700 hover:bg-neutral-600 text-neutral-200 hover:text-white px-3 py-1.5 rounded transition flex items-center justify-center border border-neutral-600"
  >
    <span class="text-sm tracking-tighter select-none font-bold">⇅</span>
  </button>
</div>
