<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Loader } from 'lucide-svelte';
	import { formatCurrency } from '$lib/utils.js';
	import { enhance } from '$app/forms';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription
	} from '$lib/components/ui/field/index.js';

	const { data } = $props();
	let uploading = $state(false);
	let price: number = $state(0);
</script>

<PageHeader>Add Products</PageHeader>
<!-- The enctype attribute specifies how the form-data should be encoded when submitting it to the server. -->
<!-- multipart/form-data	 This value is necessary if the user will upload a file through the form -->
<div class="mx-auto max-w-xl">
	<form
		class="space-y-4"
		action="/admin/products/new"
		method="POST"
		use:enhance={() => {
			uploading = true;
			return async ({ update }) => {
				await update();
				uploading = false;
			};
		}}
		enctype="multipart/form-data"
	>
		<FieldGroup>
			<Field>
				<FieldLabel for="name">Name</FieldLabel>
				<Input id="name" name="name" type="text" placeholder="Product Name" required />
			</Field>
			<Field>
				<FieldLabel for="priceInCents">Price</FieldLabel>
				<Input
					id="priceInCents"
					name="priceInCents"
					type="number"
					placeholder="Price in Cents"
					required
					bind:value={price}
				/>
			</Field>

			<div class="text-muted-foreground text-sm">
				{`Price in ${formatCurrency(price / 100)}`}
			</div>

			<Field>
				<FieldLabel for="description">Description</FieldLabel>
				<Textarea id="description" name="description" placeholder="Product Description" required />
			</Field>

			<Field>
				<FieldLabel for="productImage">Product Image</FieldLabel>
				<Input
					name="imageupload"
					accept="image/*"
					type="file"
					class="block w-full text-sm text-slate-500
					file:mr-4 file:rounded-full file:border-0
					file:bg-violet-50 file:px-4
					file:py-2 file:text-sm
					file:font-semibold file:text-black
					hover:file:bg-violet-100"
				/>
			</Field>
		</FieldGroup>

		{#if uploading}
			<Button type="submit" class="w-full">
				<Loader class="mr-2 h-4 w-4 animate-spin" />
				Adding Product...
			</Button>
		{:else}
			<Button type="submit" class="w-full">Add Product</Button>
		{/if}
	</form>
</div>
