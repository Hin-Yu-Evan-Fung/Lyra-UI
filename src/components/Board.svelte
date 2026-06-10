<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Board } from '../lib/board';
  import { Game } from '../lib/game';
  import { Engine } from '../lib/engine';
  import { formatEval } from '../lib/utils'; 
  import 'chessground/assets/chessground.base.css';
  import 'chessground/assets/chessground.brown.css';
  import 'chessground/assets/chessground.cburnett.css';


  let boardEl: HTMLElement;
  let board: Board;

  onMount(async () => {
    const game = new Game();
    const engine = new Engine();
    await engine.init();

    engine.onBestMove((move) => board.playMove(move));
    engine.onDepthFinished((depth, seldepth, eval_, time, nodes, nps, hashfull, pv) => {
      console.log(
      "info depth %d seldepth %d score %s time %d nodes %d nps %d hashfull %d pv %s",
      depth, seldepth, formatEval(eval_), time, nodes, nps, hashfull, pv
      );
    });

    board = new Board(game, engine);
    board.init(boardEl);
  });

  onDestroy(() => board?.destroy());
</script>

<div bind:this={boardEl} style="width: 500px; height: 500px;"></div>
