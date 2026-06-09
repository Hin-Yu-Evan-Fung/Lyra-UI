<script>
  import { onMount, onDestroy } from 'svelte';
  import { initBoard } from '../lib/board.js';

  let boardEl;
  let board;

  onMount(() => {
    board = initBoard(boardEl);
  });

  onDestroy(() => board?.destroy());
</script>

<div bind:this={boardEl} style="width: 500px; height: 500px;"></div>
