<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { authClient } from '$lib/auth/client/auth-client';
	import Navbar from '$lib/components/Navbar.svelte';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { Toaster } from 'svelte-5-french-toast';
	let pathname = $derived($page.url.pathname);
	let { children } = $props();

	const handleLogout = async () => {
		await authClient.signOut();
		goto('/');
	};
</script>

<Toaster />
<Navbar>
	<div class=""></div>

	<div>
		{@render navLink({ href: '/admin', text: 'Dashboard' })}
		{@render navLink({ href: '/admin/products', text: 'Products' })}
		{@render navLink({ href: '/admin/users', text: 'Customers' })}
		{@render navLink({ href: '/admin/orders', text: 'Sales' })}
	</div>

	<!-- logout button -->
	<Button onclick={handleLogout}>Logout</Button>
</Navbar>

<div class="container mx-auto mt-10 max-w-5xl">
	{@render children()}
</div>

{#snippet navLink({ href, text }: { href: string; text: string })}
	<a
		class={cn(
			'hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary  focus-visible:text-secondary-foreground p-4 capitalize transition-all ease-in',
			pathname === href && 'bg-background text-foreground'
		)}
		{href}>{text}</a
	>
{/snippet}
