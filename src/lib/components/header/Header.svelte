<script lang="ts">
	import HeaderButton from './HeaderButton.svelte';
</script>

<header
	class="pointer-events-none fixed top-0 left-0 z-10 flex w-full items-end px-6 max-tablet:h-[var(--header-height)] max-tablet:justify-end tablet:pt-6"
>
	<nav class="hidden flex-col items-start gap-y-1.25 tablet:flex">
		<a href="/">
			<HeaderButton text="Watch the film" />
		</a>
		<a href="/">
			<HeaderButton text="Pelagie's Story" />
		</a>
		<a href="/">
			<HeaderButton text="Timeline" />
		</a>
		<a href="/">
			<HeaderButton text="The House" />
		</a>
		<a href="/">
			<HeaderButton text="Resources" />
		</a>
	</nav>

	<button class="tablet:hidden">
		<HeaderButton text="Menu" />
	</button>
</header>

<style>
	@reference '../../../app.css';

	:root {
		--header-height: calc(var(--spacing) * 10);
	}
</style>
