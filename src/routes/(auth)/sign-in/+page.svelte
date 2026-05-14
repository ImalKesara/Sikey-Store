<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription
	} from '$lib/components/ui/field/index.js';
	import { enhance } from '$app/forms';
	const { data, form } = $props();
</script>

<div class="grid h-screen place-items-center">
	<Card.Root class="mx-auto w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<FieldGroup>
					<Field>
						<FieldLabel for="email">Email</FieldLabel>
						<Input id="email" name="email" type="email" placeholder="m@example.com" required />
					</Field>
					<Field>
						<div class="flex items-center">
							<FieldLabel for="password">Password</FieldLabel>
							<a href="##" class="ms-auto inline-block text-sm underline">
								Forgot your password?
							</a>
						</div>
						<Input id="password" name="password" type="password" required />
					</Field>
					<Field>
						<Button type="submit" class="w-full">Login</Button>
						<FieldDescription class="text-center">
							Don't have an account? <a href="/sign-up">Sign up</a>
						</FieldDescription>
					</Field>
				</FieldGroup>
			</form>
		</Card.Content>
		<Card.Footer class="flex justify-center">
			{#if form?.message}
				<p class="text-center text-red-500">{form.message}</p>
			{/if}
		</Card.Footer>
	</Card.Root>
</div>
