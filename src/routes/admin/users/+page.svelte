<script lang="ts">
	import { enhance } from '$app/forms';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as Table from '$lib/components/ui/table';
	import {  EllipsisVertical } from 'lucide-svelte';
	import { formartNumber, formatCurrency } from '$lib/utils.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	// reactive value do not destrcuter
	let { data } = $props();
</script>

<PageHeader>Customers</PageHeader>
{#if data.users.length === 0}
	<h1>No Remain Customers 🙅</h1>
{:else}
	{@render customerTable()}
{/if}

{#snippet customerTable()}
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-0">Email</Table.Head>
				<Table.Head>Orders</Table.Head>
				<Table.Head>Value</Table.Head>
				<Table.Head class="w-0 text-right">
					<span class="sr-only">Actions</span>
				</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.users as user}
				<Table.Row>
					<Table.Cell>
						{user.email}
					</Table.Cell>
					<Table.Cell>{formartNumber(user.order.length)}</Table.Cell>
					<Table.Cell
						>{formatCurrency(
							user.order.reduce((sum, curr) => sum + curr.priceInCents, 0)
						)}</Table.Cell
					>
					<Table.Cell class="text-right">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<EllipsisVertical />
								<span class="sr-only">Actions</span>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<!-- Toggle status Active/Inactive Status -->
								<form action="?/deleteUser" use:enhance method="POST">
									<button type="submit" class="w-full text-destructive">
										<DropdownMenu.Item>Delete</DropdownMenu.Item>
									</button>
									<input type="hidden" name="id" value={user.id} />
								</form>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/snippet}
