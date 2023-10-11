<script lang="ts">
	import { T } from '@threlte/core';
	import Grid from './Grid.svelte';
	import { interactivity } from '@threlte/extras';
	import { onMount, onDestroy } from 'svelte';

	import * as input from '$lib/input';

	interactivity();

	let cursor = { x: 0, y: 0 };

	onMount(input.init);
	onDestroy(input.destroy);
</script>

<Grid {cursor} />

<T.PerspectiveCamera
	makeDefault
	position={[0, 0, 30]}
	zoom={0.7}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0);
	}}
/>

<T.DirectionalLight position={[0, 10, 10]} />

<!-- cursor position listener -->
<T.Mesh
	visible={false}
	on:pointermove={(e) => {
		cursor = e.pointer;
	}}
>
	<T.BoxGeometry args={[100, 100]} />
</T.Mesh>
