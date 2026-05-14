<script lang="ts">
	import ProductsGridSection from '$lib/components/ProductsGridSection.svelte';
	import { Button } from '$lib/components/ui/button';
	import { formatCurrency } from '$lib/utils';
	let { data } = $props();

	const most = data?.mostPopularProduct ?? [];
	const newset = data?.newsetProduct ?? [];
	const featured = most[0] ?? newset[0] ?? null;
</script>

<svelte:head>
	<title>Sikey Store</title>
</svelte:head>

<main class="space-y-10">
	<!-- Hero -->
	<section class="container mx-auto grid items-center gap-8 px-4 py-10 lg:grid-cols-2">
		<div class="space-y-6">
			<h1 class="text-4xl leading-tight font-extrabold capitalize sm:text-5xl">
				Premium sneakers, built for everyday movement
			</h1>
			<p class="text-muted-foreground max-w-xl capitalize">
				Discover lightweight, comfortable, and stylish shoes designed for all-day wear. From casual
				outings to active lifestyles, find the perfect pair that fits your step.
			</p>

			<div class="flex flex-wrap gap-3">
				<Button href="/products" size="lg">Shop all shoes</Button>
				{#if featured}
					<Button variant="outline" href={`/products/${featured.id}/purchase`} size="lg">
						Buy featured
					</Button>
				{/if}
			</div>
		</div>

		<div>
			{#if featured}
				<article
					class="bg-background overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-lg"
				>
					<img
						src={featured.imagePath ?? `https://picsum.photos/800/600?random=1`}
						alt={featured.name}
						class="h-72 w-full object-cover"
						loading="lazy"
					/>
					<div class="p-4">
						<h3 class="text-xl font-semibold">{featured.name}</h3>
						<p class="text-muted-foreground mt-1 line-clamp-3 text-sm">{featured.description}</p>

						<div class="mt-4 flex items-center justify-between">
							<div class="text-lg font-bold">{formatCurrency(featured.priceInCents / 100)}</div>
							<Button href={`/products/${featured.id}/purchase`}>Purchase</Button>
						</div>
					</div>
				</article>
			{:else}
				<div class="flex h-72 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
					<span class="text-muted-foreground">No featured product</span>
				</div>
			{/if}
		</div>
	</section>

	<!-- Most popular -->
	<section class="container mx-auto px-4">
		<ProductsGridSection title="Most Popular" products={most} />
	</section>

	<!-- New arrivals -->
	<section class="container mx-auto px-4">
		<ProductsGridSection title="New Arrivals" products={newset} />
	</section>
</main>
