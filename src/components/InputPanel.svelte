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

<div class="flex flex-row flex-wrap gap-3 p-2 rounded w-full items-center">
  <div class="flex flex-row items-center gap-2 w-full md:flex-1 min-w-0">
    <span class="text-xs text-neutral-400 uppercase font-bold px-1">FEN</span>

    <div class="flex flex-row bg-gray-700 rounded flex-1 min-w-0">
      <input
        type="text"
        bind:value={$currentFen}
        class="flex-1 min-w-0 text-sm rounded px-2 py-1 focus:outline-none bg-transparent text-white"
      />
      {#if error}
        <span
          class="text-xs text-red-400 font-medium px-2 flex items-center gap-1 shrink-0"
        >
          ⚠️ {error}
        </span>
      {/if}
    </div>
  </div>

  <div class="flex flex-row flex-nowrap gap-2 mx-auto">
    <button
      on:click={onFenSubmit}
      class="bg-blue-600 hover:bg-blue-500 text-sm px-3 py-1.5 rounded transition whitespace-nowrap"
    >
      Load
    </button>
    <button
      on:click={newGame}
      class="bg-blue-600 hover:bg-blue-500 text-sm px-3 py-1.5 rounded transition whitespace-nowrap"
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
</div>
