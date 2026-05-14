<script lang="ts">
	import ProductCards from './ProductCards.svelte';
	import { ArrowRight } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import type { Product } from '../../../generated/prisma/client';

	type ProductsGridSection = {
		title: string;
		products: Product[];
		class?: string;
	};
	let { title, products, class: className }: ProductsGridSection = $props();
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between gap-3">
		<h2 class="text-3xl font-bold capitalize">{title}</h2>
		<Button variant="outline" class="hidden space-x-2 sm:inline-flex" href="/products">
			<span>View All</span>
			<ArrowRight class="size-4" />
		</Button>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 {className}">
		{#each products as product (product.id)}
			<ProductCards {...product} />
		{/each}
	</div>
</div>
