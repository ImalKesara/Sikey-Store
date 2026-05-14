<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';
	let pathname = $derived($page.url.pathname);
	import { cn } from '$lib/utils';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<Navbar>
	{@render navLink({ href: '/', text: 'Home' })}
	{@render navLink({ href: '/products', text: 'Products' })}
</Navbar>

<div class="container mx-auto mt-10 max-w-6xl">
	{@render children()}
</div>

<Footer>
	{@render footer({ text: 'Built with Svelte' })}
</Footer>

{#snippet navLink({ href, text }: { href: string; text: string })}
	<a
		class={cn(
			'hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary  focus-visible:text-secondary-foreground p-4 capitalize transition-all ease-in',
			pathname === href && 'bg-background text-foreground'
		)}
		{href}>{text}</a
	>
{/snippet}

{#snippet footer({ text }: { text: string })}
	<p class="p-5">{text}</p>
{/snippet}
