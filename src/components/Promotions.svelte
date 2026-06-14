<script lang="ts">
  import { showPromotion } from "../lib/stores";
  export let onSelect: (piece: string) => void;
</script>

{#if $showPromotion}
  <div class="flex justify-center gap-2 p-2">
    {#each ["q", "r", "b", "n"] as piece, i}
      <button
        onclick={() => onSelect(piece)}
        class="text-4xl bg-gray-700 hover:bg-gray-600 rounded p-2"
      >
        {$showPromotion.color === "b"
          ? ["♕", "♖", "♗", "♘"][i]
          : ["♛", "♜", "♝", "♞"][i]}
      </button>
    {/each}
  </div>
{/if}
