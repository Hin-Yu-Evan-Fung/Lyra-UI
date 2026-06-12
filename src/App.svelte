<script>
  import { onMount } from "svelte";

  import Board from "./components/Board.svelte";
  import Controls from "./components/Controls.svelte";
  import DepthInfo from "./components/DepthInfo.svelte";
  import EvalBar from "./components/EvalBar.svelte";
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
      depthInfo.set({
        depth,
        seldepth,
        eval_,
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

        <div class="p-2 shrink-0">
          <InputPanel />
        </div>

        <div
          class="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 p-4 items-start"
        >
          <!-- board + eval bar together -->
          <div class="flex flex-row gap-4 items-stretch w-full">
            <div class="flex flex-col justify-stretch self-stretch w-4">
              <EvalBar />
            </div>
            <Board />
          </div>

          <!-- side panel -->
          <div
            class="flex flex-col gap-4 w-full lg:w-72"
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
