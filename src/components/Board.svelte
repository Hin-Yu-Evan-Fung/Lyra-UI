<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Board } from "../lib/board";
  import "chessground/assets/chessground.base.css";
  import "chessground/assets/chessground.brown.css";
  import "chessground/assets/chessground.cburnett.css";
  import { board, gameStatus, showPromotion } from "../lib/stores";
  import Promotions from "./Promotions.svelte";
  import { completeMove } from "../lib/utils";
  import type { Key } from "chessground/types";
  import EvalBar from "./EvalBar.svelte";

  let boardEl: HTMLElement;

  board.set(new Board());

  onMount(async () => {
    $board?.init(boardEl);
  });

  onDestroy(() => $board?.destroy());
</script>

<!-- board + eval bar together -->
<div class="flex flex-col gap-4 items-stretch">
  <div class="flex flex-row gap-4 items-stretch w-full">
    <div class="flex flex-col justify-stretch self-stretch w-4">
      <EvalBar />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <div
        class="relative transition-all duration-300"
        class:grayscale={$gameStatus}
        class:opacity-60={$gameStatus}
        bind:this={boardEl}
        style="width: 100%; aspect-ratio: 1"
      ></div>
    </div>
  </div>

  {#if $showPromotion}
    <Promotions
      onSelect={(piece) => {
        completeMove(
          $showPromotion.from as Key,
          $showPromotion.to as Key,
          piece,
        );
        showPromotion.set(null);
      }}
    />
  {/if}

  {#if $gameStatus}
    <div class="text-center py-2 bg-gray-800 rounded-lg">
      <p class="text-white font-bold text-lg">{$gameStatus}</p>
    </div>
  {/if}
</div>
