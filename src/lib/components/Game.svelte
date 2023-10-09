<script lang="ts">
	import { T } from '@threlte/core';
	import Camera from './Camera.svelte';
	import Grid from './Grid.svelte';
	import { interactivity } from '@threlte/extras';

	interactivity();

	let cursor = { x: 0, y: 0 };
</script>

<Camera />
<Grid {cursor} />

<T.Mesh
	visible={false}
	on:pointermove={(e) => {
		cursor = e.pointer;
	}}
>
	<T.BoxHelper />
	<T.BoxGeometry args={[100, 100]} />
</T.Mesh>
