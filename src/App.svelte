<script>
  import { onMount } from "svelte";

  import Board from "./components/Board.svelte";
  import Controls from "./components/Controls.svelte";
  import DepthInfo from "./components/DepthInfo.svelte";
  import InputPanel from "./components/InputPanel.svelte";
  import MoveHistory from "./components/MoveHistory.svelte";

  import { Game } from "./lib/game";
  import { Engine } from "./lib/engine";
  import { depthInfo, engine, game, boardHeight, board } from "./lib/stores";

  engine.set(new Engine());
  game.set(new Game());

  $engine.onBestMove((move) => $game.playMove(move));
  $engine.onDepthFinished(
    (depth, seldepth, eval_, time, nodes, nps, hashfull, pv) => {
      const normalised = $game.turn === "b" ? -eval_ : eval_;
      depthInfo.set({
        depth,
        seldepth,
        normalised,
        time,
        nodes,
        nps,
        hashfull,
        pv,
      });

      const bestMove = pv.split(" ")[0];
      if (bestMove) $board.showArrow(bestMove);
    },
  );

  let initPromise;

  onMount(() => {
    initPromise = $engine.init();
  });
</script>

{#if !initPromise}
  <p>Booting engine...</p>
{:else}
  {#await initPromise}
    <div class="loading-screen">
      <h2>Loading Lyra...</h2>
    </div>
  {:then}
    <main>
      <div class="flex flex-col overflow-x-hidden h-screen bg-gray text-white">
        <div class="p-2 shrink-0">
          <h1 class="text-xl font-bold">Lyra Chess Engine</h1>
        </div>

        <div class="p-2">
          <InputPanel />
        </div>

        <div
          class="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 p-4 items-start"
        >
          <Board />
          <!-- side panel -->
          <div
            class="flex flex-col gap-4 min-w-90 lg:w-90"
            style="height: {$boardHeight}px"
          >
            <Controls />
            <DepthInfo />
            <MoveHistory />
          </div>
        </div>
      </div>
    </main>
  {:catch error}
    <div class="error-screen">
      <p>Failed to initialize engine: {error.message}</p>
    </div>
  {/await}
{/if}
