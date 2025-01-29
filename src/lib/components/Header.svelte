<header
	class="pointer-events-none fixed top-0 left-0 z-10 flex w-full items-end px-6 max-tablet:h-[var(--header-height)] max-tablet:justify-end tablet:pt-6"
>
	<nav class="hidden flex-col items-start gap-y-0.5 tablet:flex">
		<a href="/" class="pointer-events-auto">Watch the film</a>
		<a href="/" class="pointer-events-auto">Pelagie's Story</a>
		<a href="/" class="pointer-events-auto">Timeline</a>
		<a href="/" class="pointer-events-auto">The House</a>
		<a href="/" class="pointer-events-auto">Resources</a>
	</nav>

	<button class="tablet:hidden">Menu</button>
</header>

<style>
	@reference '../../app.css';

	:root {
		--header-height: calc(var(--spacing) * 10);
	}
</style>
