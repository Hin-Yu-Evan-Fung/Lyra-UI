<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Board } from "../lib/board";
  import "chessground/assets/chessground.base.css";
  import "chessground/assets/chessground.brown.css";
  import "chessground/assets/chessground.cburnett.css";
  import { board, gameStatus } from "../lib/stores";

  let boardEl: HTMLElement;

  board.set(new Board());

  onMount(async () => {
    $board?.init(boardEl);
  });

  onDestroy(() => $board?.destroy());
</script>

<div class="flex flex-col gap-2 w-full">
  <div
    class="relative transition-all duration-300"
    class:grayscale={$gameStatus}
    class:opacity-60={$gameStatus}
    bind:this={boardEl}
    style="width: 100%; aspect-ratio: 1"
  ></div>

  {#if $gameStatus}
    <div class="text-center py-2 bg-gray-800 rounded-lg">
      <p class="text-white font-bold text-lg">{$gameStatus}</p>
    </div>
  {/if}
</div>
