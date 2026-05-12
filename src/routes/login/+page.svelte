<script lang="ts">
	import { Loader } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginFormSchema } from '$lib/formSchema.js';
	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(loginFormSchema)
	});
	const { form: formData, delayed,  } = form;
</script>

<form class="grid h-screen place-items-center" method="POST">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your username & password below to login to your account.</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<!-- username -->
			<Form.Field {form} name="username">
				<Form.Control let:attrs>
					<Form.Label>Username</Form.Label>
					<Input type="text" {...attrs} bind:value={$formData.username} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!-- password -->
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input type="password" {...attrs} bind:value={$formData.password} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Button class="w-full" type="submit">
				{#if $delayed}
					<Loader class="size-4 animate-spin" />
				{:else}
					Login
				{/if}
			</Button>
		</Card.Footer>
	</Card.Root>
</form>
