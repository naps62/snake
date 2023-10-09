<script lang="ts">
	import { T } from '@threlte/core';
	import Grid from './Grid.svelte';
	import { interactivity } from '@threlte/extras';

	interactivity();

	let cursor = { x: 0, y: 0 };
</script>

<Grid {cursor} />

<T.PerspectiveCamera
	makeDefault
	position={[0, 0, 10]}
	zoom={0.7}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0);
	}}
/>

<!-- cursor position listener -->
<T.Mesh
	visible={false}
	on:pointermove={(e) => {
		cursor = e.pointer;
	}}
>
	<T.BoxGeometry args={[100, 100]} />
</T.Mesh>
