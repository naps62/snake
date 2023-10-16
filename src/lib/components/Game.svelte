<script lang="ts">
  import { T, useFrame } from '@threlte/core';
  import Grid from './Grid.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { interactivity } from '@threlte/extras';

  import * as input from '$lib/input';
  import bgFragment from '$lib/shaders/bg.fragment.glsl?raw';
  import { AdditiveBlending } from 'three';
  import { writable } from 'svelte/store';

  interactivity();
  onMount(input.init);
  onDestroy(input.destroy);

  let elapsed = writable(0);

  let onClick: (e: any) => void;

  useFrame((_ctx, delta) => {
    elapsed.set($elapsed + delta);
  });
</script>

<Grid bind:onClick elapsed={$elapsed} />

<T.Mesh position.z={-0.5} on:click={onClick}>
  <T.BoxGeometry args={[1000, 1000, -20]} />
  <T.ShaderMaterial
    fragmentShader={bgFragment}
    uniforms={{ time: { value: 0 } }}
    uniforms.time.value={$elapsed}
    blending={AdditiveBlending}
  />
</T.Mesh>
