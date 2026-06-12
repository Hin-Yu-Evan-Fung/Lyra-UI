<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Board } from "../lib/board";
  import "chessground/assets/chessground.base.css";
  import "chessground/assets/chessground.brown.css";
  import "chessground/assets/chessground.cburnett.css";
  import { board } from "../lib/stores";

  let boardEl: HTMLElement;

  board.set(new Board());

  onMount(async () => {
    $board?.init(boardEl);
  });

  onDestroy(() => $board?.destroy());
</script>

<div class="aspect-square w-full min-h-0" bind:this={boardEl}></div>
