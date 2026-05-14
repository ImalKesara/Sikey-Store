<script lang="ts">
	import { enhance } from '$app/forms';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { CircleCheckBig, EllipsisVertical } from 'lucide-svelte';
	import { formartNumber, formatCurrency } from '$lib/utils.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { CircleX } from 'lucide-svelte';

	// reactive value do not destrcuter
	let { data } = $props();
</script>

<div class="flex items-center justify-between gap-4">
	<PageHeader>All Prodcuts</PageHeader>
	<Button href="/admin/products/new">Add Products</Button>
</div>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-0">
				<span class="sr-only">Available for purchase</span>
			</Table.Head>
			<Table.Head>Product Name</Table.Head>
			<Table.Head>Product Price</Table.Head>
			<Table.Head>Order</Table.Head>
			<Table.Head class="w-0">
				<span class="sr-only">Actions</span>
			</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.products as product}
			<Table.Row>
				<Table.Cell>
					{#if product.isAvailableForPurchase}
						<span class="sr-only">Available</span>
						<CircleCheckBig class="text-green-500" />
					{:else}
						<span class="sr-only">Unavailable</span>
						<CircleX class="text-red-500" />
					{/if}
				</Table.Cell>
				<Table.Cell>{product.name}</Table.Cell>
				<Table.Cell>{formatCurrency(product.priceInCents / 100)}</Table.Cell>
				<Table.Cell>{formartNumber(product._count.order)}</Table.Cell>
				<Table.Cell class="text-right">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<EllipsisVertical />
							<span class="sr-only">Actions</span>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<!-- Download product image -->
							<DropdownMenu.Item href="/admin/products/{product.id}/download" download
								>Download</DropdownMenu.Item
							>
							<!-- edit product details -->
							<DropdownMenu.Item href="/admin/products/{product.id}/edit">Edit</DropdownMenu.Item>
							<!-- Toggle status Active/Inactive Status -->
							<form action="?/toggleAvailability" use:enhance method="POST">
								<button type="submit" class="w-full">
									<DropdownMenu.Item>
										{#if product.isAvailableForPurchase}
											Deactivate
										{:else}
											Activate
										{/if}
									</DropdownMenu.Item>
								</button>
								<input type="hidden" name="id" value={product.id} />
								<!-- check true of false here checked = true unchecked = false -->
								<input
									type="checkbox"
									name="isAvailableForPurchase"
									class="hidden"
									checked={!product.isAvailableForPurchase}
								/>
							</form>
							<!-- Delete product -->
							<form action="?/deleteProduct" use:enhance method="POST">
								<button class="text-destructive w-full" disabled={product._count.order > 0}>
									<DropdownMenu.Item type="submit" disabled={product._count.order > 0}
										>Delete</DropdownMenu.Item
									>
								</button>
								<input type="hidden" name="id" value={product.id} />
							</form>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
