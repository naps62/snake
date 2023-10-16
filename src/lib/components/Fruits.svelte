<svelte:options accessors />

<script lang="ts">
  import { T } from '@threlte/core';
  import type { Position } from '$lib/utils';
  import { setIdx } from '$lib/utils';
  import fruitFragment from '$lib/shaders/fruit.fragment.glsl?raw';

  export let elapsed: number;
  export let width: number;
  export let scale: number;
  export let spacing: number;

  export let positions: Position[] = [];
  let set: Set<string> = new Set();

  export function remove(idx: number) {
    let p = positions[idx];
    set.delete(setIdx(p));
    positions.splice(idx, 1);
    positions = positions;
  }

  export function update(snakeBits: Set<string>) {
    while (set.size == 0) {
      gen(snakeBits);
    }
  }

  function gen(snakeBits: Set<string>) {
    let p: Position;

    do {
      p = { x: rand(), y: rand() };
    } while (snakeBits.has(setIdx(p)) || set.has(setIdx(p)));

    set.add(setIdx(p));
    positions.push(p);
  }

  function rand() {
    return Math.floor(Math.random() * width) - Math.floor(width / 2);
  }
</script>

{#each positions as { x, y }}
  <T.Mesh {scale} position.x={x * (scale + spacing)} position.y={y * (scale + spacing)} castShadow>
    <T.CircleGeometry args={[0.5, 15]} />

    <T.ShaderMaterial
      fragmentShader={fruitFragment}
      uniforms={{ time: { value: 0 } }}
      uniforms.time.value={elapsed}
    />
  </T.Mesh>
{/each}
