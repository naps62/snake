<script lang="ts">
  import { T } from '@threlte/core';
  import { spring } from 'svelte/motion';
  import { useFrame } from '@threlte/core';

  import { Snake } from '$lib/snake';
  import { Fruits } from '$lib/fruits';

  export let cursor: { x: number; y: number };

  const width = 30;
  const cellScale = 0.9;
  const cellSpacing = 0.2;
  const start = -((width - 1) * (cellScale + cellSpacing)) / 2;
  const rotationWeight = 0.2;
  const rotation = spring({ x: 0, y: 0 });
  let snake = new Snake(width, { x: 5, y: 5 });
  let fruits = new Fruits(width);

  // two ticks per second
  const tickTime = 0.1;
  let elapsed = 0;

  $: rotation.set({ x: cursor.y * rotationWeight, y: -cursor.x * rotationWeight });
  $: console.log(fruits);

  // update loop
  useFrame((_ctx, delta) => {
    elapsed += delta;
    while (elapsed > tickTime) {
      snake.tick(fruits);
      elapsed -= tickTime;
    }

    // force re-render
    snake = snake;
    fruits = fruits;
  });
</script>

<T.Group rotation.x={$rotation.x} rotation.y={$rotation.y}>
  <T.Mesh
    position.z={-0.5}
    scale.x={cellScale * (width + 1) + cellSpacing * (width - 1)}
    scale.y={cellScale * (width + 1) + cellSpacing * (width - 1)}
  >
    <T.BoxGeometry args={[1, 1, 0.2]} />
    <T.MeshStandardMaterial color={[0, 0.9, 0.9]} />
  </T.Mesh>

  <!-- render each fruit -->
  {#each fruits.array as { x, y }}
    <T.Mesh
      scale={cellScale}
      position.x={start + x * (cellScale + cellSpacing)}
      position.y={start + y * (cellScale + cellSpacing)}
      position.z={0.5}
      castShadow
    >
      <T.BoxGeometry args={[1, 1, 0.2]} />
      <T.MeshStandardMaterial color={[1, 0.4, 0.7]} />
    </T.Mesh>
  {/each}

  <!-- render each snake bit -->
  {#each snake.array as { x, y }}
    <T.Mesh
      scale={cellScale}
      position.x={start + x * (cellScale + cellSpacing)}
      position.y={start + y * (cellScale + cellSpacing)}
      position.z={0.5}
      castShadow
    >
      <T.BoxGeometry args={[1, 1, 0.2]} />
      <T.MeshStandardMaterial color={[1, 0.4, 0.7]} />
    </T.Mesh>
  {/each}
</T.Group>
