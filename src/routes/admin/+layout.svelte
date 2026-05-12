<script lang="ts">
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import { cn } from '$lib/utils';
	import  {Toaster} from 'svelte-5-french-toast'
	let pathname = $derived($page.url.pathname);
	let { children } = $props();
</script>

<Toaster />
<Navbar>
	{@render navLink({ href: '/admin', text: 'Dashboard' })}
	{@render navLink({ href: '/admin/products', text: 'Products' })}
	{@render navLink({ href: '/admin/users', text: 'Customers' })}
	{@render navLink({ href: '/admin/orders', text: 'Sales' })}

	<!-- logout button -->
</Navbar>

<div class="container my-6">
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
