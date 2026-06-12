<script>
  import { onMount } from "svelte";

  import InputPanel from "./components/inputPanel.svelte";
  import Board from "./components/Board.svelte";
  import Controls from "./components/Controls.svelte";
  import DepthInfo from "./components/DepthInfo.svelte";
  import MoveHistory from "./components/MoveHistory.svelte";

  import { Game } from "./lib/game";
  import { Engine } from "./lib/engine";
  import { depthInfo, engine, game } from "./lib/stores";

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
      <h2>Loading Stockfish/Chess Engine...</h2>
    </div>
  {:then}
    <main>
      <div class="flex flex-col hoverflow-hidden h-screen bg-gray text-white">
        <div class="h-full">
          <h1>Lyra Chess Engine</h1>
        </div>

        <div class=" p-2">
          <InputPanel />
        </div>

        <!-- Middle: eval bar + board + side panel -->
        <div
          class="flex sm:flex-col md: flex-col lg:flex-row flex-1 items-center justify-center gap-4 p-4"
        >
          <!-- <EvalBar /> -->
          <Board />
          <div class="flex flex-col gap-4 w-64 w-full self-start">
            <Controls />
            <DepthInfo />
            <MoveHistory />
          </div>
        </div>

        <!-- Bottom: PGN output -->
        <div class="p-2">
          <!-- <PgnOutput /> -->
        </div>

        <div class="h-full"></div>
      </div>
    </main>
  {:catch error}
    <div class="error-screen">
      <p>Failed to initialize engine: {error.message}</p>
    </div>
  {/await}
{/if}
