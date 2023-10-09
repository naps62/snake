<script lang="ts">
	import Game from '$lib/components/Game.svelte';
	import { Canvas } from '@threlte/core';
	import type { ThrelteContext } from '@threlte/core';
	import { onMount } from 'svelte';

	let ctx: ThrelteContext;

	let width = 800;
	let height = 800;
	let gap = 10;

	function onResize() {
		width = Math.min(window.innerWidth, window.innerHeight) - gap * 2;
		height = width;
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
		background-color: #eee;
	}

	:global(canvas) {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		background-color: white;
		margin: auto;
	}
</style>
