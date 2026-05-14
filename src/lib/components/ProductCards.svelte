<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { formatCurrency } from '$lib/utils';

	type ProductCardsProps = {
		id: string;
		name: string;
		priceInCents: number;
		description: string;
		imagePath?: string | null;
	};

	let { id, name, priceInCents, description, imagePath }: ProductCardsProps = $props();
</script>

<Card.Root class="flex flex-col overflow-hidden rounded-lg transition-shadow hover:shadow-lg">
	<img
		src={imagePath ?? `https://picsum.photos/600/400?random=${id}`}
		class="aspect-video h-auto w-full object-cover"
		alt={name}
		loading="lazy"
	/>
	<Card.Header>
		<Card.Title>{name}</Card.Title>
		<Card.Description>{formatCurrency(priceInCents / 100)}</Card.Description>
	</Card.Header>
	<Card.Content class="flex-grow">
		<p class="text-muted-foreground line-clamp-4 text-sm">{description}</p>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full" size="lg" href={`/products/${id}/purchase`}>Purchase</Button>
	</Card.Footer>
</Card.Root>
