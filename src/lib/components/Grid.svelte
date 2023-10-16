<svelte:options accessors />

<script lang="ts">
  import { T, useFrame } from '@threlte/core';
  import { spring, tweened } from 'svelte/motion';
  import { interactivity } from '@threlte/extras';

  import gridFragment from '$lib/shaders/grid.fragment.glsl?raw';

  import Snake from './Snake.svelte';
  import Fruits from './Fruits.svelte';
  import { interpolateQuadraticEaseOut } from '$lib/utils';
  import { onMount } from 'svelte';

  interactivity();

  export let elapsed: number;

  const cellScale = 1;
  const cellSpacing = 0.0;
  const rotationWeight = 0.01;
  let width = 16;
  let backgroundScale = 0;

  const rotation = spring({ x: 0, y: 0 });
  const widthTween = tweened(width);
  let cameraDistance = tweened(width);
  let fruits: Fruits;
  let snake: Snake;

  let tickTime = 0.1;
  let localElapsed = 1;
  let totalElapsed = tweened(0);

  $: snake && rewire();
  $: width && resize();
  $: backgroundScale = cellScale * ($widthTween + 1) + cellSpacing * ($widthTween - 1);

  function resize() {
    widthTween.set(width);
    if (window.innerHeight > window.innerWidth) {
      // cameraDistance.set(width);
      cameraDistance.set((width * window.innerHeight) / window.innerWidth);
    } else {
      cameraDistance.set(width);
    }
  }

  onMount(() => window.addEventListener('resize', resize));

  function rewire() {
    // snake's speed increases up to 0.01 seconds per tick when len == 50
    // board width increases up to 80% of snake's length when len == 10
    if (snake.len() % 5 == 0) {
      tickTime = interpolateQuadraticEaseOut(0.1, 0.01, snake.len() / 100);
      width = Math.floor(interpolateQuadraticEaseOut(16, 100, (snake.len() - 1) / 200));
      if (width % 2 == 1) {
        width++;
      }
    }
  }

  useFrame((_ctx, delta) => {
    snake.set && fruits.update(snake.set);
    localElapsed += delta;
    totalElapsed.set($totalElapsed + delta);
    while (localElapsed > tickTime) {
      snake.tick();
      localElapsed -= tickTime;

      const collision = snake.collide(fruits.positions!);
      if (collision >= 0) {
        fruits.remove(collision);
      }

      snake.array &&
        rotation.set({
          x: snake.array[0].y * rotationWeight,
          y: -snake.array[0].x * rotationWeight
        });
      // force re-render
      snake = snake;
      fruits = fruits;
    }
  });

  export function onClick(e: any) {
    const { x, y } = e.pointer;

    if (Math.abs(x) > Math.abs(y)) {
      // x-axis movement
      x < 0 ? snake.left() : snake.right();
    } else {
      y < 0 ? snake.down() : snake.up();
    }
  }
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, $cameraDistance]}
  zoom={0.7}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0);
  }}
/>

<T.Group rotation.x={$rotation.x} rotation.y={$rotation.y}>
  <T.Mesh position.z={-0.1}>
    <T.BoxGeometry args={[backgroundScale, backgroundScale, 0.1]} />
    <T.ShaderMaterial
      ShaderMaterial
      fragmentShader={gridFragment}
      uniforms={{ time: { value: 0 } }}
      uniforms.time.value={elapsed}
    />
  </T.Mesh>

  <Snake bind:this={snake} {width} {elapsed} scale={cellScale} spacing={cellSpacing} />

  <Fruits bind:this={fruits} {width} scale={cellScale} spacing={cellSpacing} {elapsed} />
</T.Group>
