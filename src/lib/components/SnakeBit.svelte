<script lang="ts">
  import { blue, red } from '$lib/colors';
  import type { Position } from '$lib/utils';
  import { T } from '@threlte/core';
  import { writable } from 'svelte/store';

  import snakeFragment from '$lib/shaders/snake.fragment.glsl?raw';

  export let elapsed: number;
  export let scale: number;
  export let spacing: number;
  export let x: number;
  export let y: number;
  export let len: number = 1;
  export let idx: number = 0;

  const colorRatio = writable(0);
  const color = writable(blue.lerpHSL(red, $colorRatio));

  let pos: Position = {
    x: x * (scale + spacing),
    y: y * (scale + spacing)
  };

  $: pos = {
    x: x * (scale + spacing),
    y: y * (scale + spacing)
  };

  $: colorRatio.set(len > 1 ? idx / (len - 1) : 0);
  $: color.set(blue.clone().lerpHSL(red, $colorRatio));
</script>

<T.Mesh {scale} position.x={pos.x} position.y={pos.y} castShadow>
  <T.BoxGeometry args={[1, 1, 0.001]} />
  <T.ShaderMaterial
    fragmentShader={snakeFragment}
    uniforms={{ time: { value: 0 } }}
    uniforms.time.value={elapsed}
  />
</T.Mesh>
