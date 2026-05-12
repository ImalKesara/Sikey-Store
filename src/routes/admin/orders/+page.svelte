<script lang="ts">
	import { enhance } from '$app/forms';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as Table from '$lib/components/ui/table';
	import {  EllipsisVertical } from 'lucide-svelte';
	import {  formatCurrency } from '$lib/utils.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	// reactive value do not destrcuter
	let { data } = $props();
</script>

<PageHeader>Customers</PageHeader>
{#if data.orders.length === 0}
	<h1>No Sales Found 🏷️</h1>
{:else}
	{@render orderTable()}
{/if}

{#snippet orderTable()}
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-0">Product</Table.Head>
				<Table.Head>Customer</Table.Head>
				<Table.Head>Price Paid</Table.Head>
				<Table.Head class="w-0 text-right">
					<span class="sr-only">Actions</span>
				</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.orders as order}
				<Table.Row>
					<Table.Cell>
						{order.product.name}
					</Table.Cell>
					<Table.Cell>{order.user.email}</Table.Cell>
					<Table.Cell>{formatCurrency(order.priceInCents / 100)}</Table.Cell>
					<Table.Cell class="text-right">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<EllipsisVertical />
								<span class="sr-only">Actions</span>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<!-- Toggle status Active/Inactive Status -->
								<form action="?/deleteOrder" use:enhance method="POST">
									<button type="submit" class="w-full text-destructive">
										<DropdownMenu.Item>Delete</DropdownMenu.Item>
									</button>
									<input type="hidden" name="id" value={order.id} />
								</form>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/snippet}
