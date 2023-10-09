<script lang="ts">
	import { T } from '@threlte/core';

	export let cursor: { x: number; y: number };

	const width = 10;
	const cellScale = 1.1;
	const cellSpacing = 0.1;
	const start = -((width - 1) * (cellScale + cellSpacing)) / 2;

	const rotationWeight = 0.2;
</script>

<T.Group rotation.x={cursor.y * rotationWeight} rotation.y={-cursor.x * rotationWeight}>
	{#each Array(width) as _, x}
		{#each Array(width) as _, y}
			<T.Mesh
				scale={cellScale}
				position.x={start + x * (cellScale + cellSpacing)}
				position.y={start + y * (cellScale + cellSpacing)}
			>
				<T.BoxGeometry args={[1, 1, 0.1]} />
			</T.Mesh>
		{/each}
	{/each}
</T.Group>
