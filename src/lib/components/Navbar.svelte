<script lang="ts">
	import type { Snippet } from 'svelte';

	type Children = {
		children: Snippet;
	};

	let { children }: Children = $props();
</script>

<nav class="bg-primary text-primary-foreground flex list-none items-center justify-between p-3">
	{@render children()}
</nav>
