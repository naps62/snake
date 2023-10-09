<script lang="ts">
	import { T } from '@threlte/core';
</script>

<T.PerspectiveCamera
	makeDefault
	position={[0, 0, 10]}
	zoom={0.7}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0);
	}}
/>
