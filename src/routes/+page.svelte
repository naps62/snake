<script lang="ts">
  import Game from '$lib/components/Game.svelte';
  import { Canvas } from '@threlte/core';
  import type { ThrelteContext } from '@threlte/core';
  import { onMount } from 'svelte';

  let ctx: ThrelteContext;

  let width = 0;
  let height = 0;

  onResize();

  function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  onMount(() => window.addEventListener('resize', onResize));
</script>

<div>
  <Canvas bind:ctx size={{ width, height }}>
    <Game />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
    width: 100%;
    background-color: rgb(0.07, 0.07, 0.07);
  }

  :global(canvas) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    margin: auto;
  }
</style>
