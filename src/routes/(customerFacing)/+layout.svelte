<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';
	let pathname = $derived($page.url.pathname);
	import { cn } from '$lib/utils';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<div class="bg-background flex min-h-screen flex-col font-sans antialiased">
	<Navbar>
		<h1 class="text-2xl font-medium uppercase">Sikey</h1>

		<div>
			{@render navLink({ href: '/', text: 'Home' })}
			{@render navLink({ href: '/products', text: 'Products' })}
		</div>
	</Navbar>

	<main class="container mx-auto max-w-6xl sm:my-10">
		{@render children()}
	</main>

	<Footer>
		{@render footer({
			text: `&copy; ${new Date().getFullYear()} Sikey Store · All rights reserved`
		})}
	</Footer>
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

{#snippet footer({ text }: { text: string })}
	<p class="p-5">{@html text}</p>
{/snippet}
