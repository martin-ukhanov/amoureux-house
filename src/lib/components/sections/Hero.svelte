<script lang="ts">
	import ButtonCircle from '$lib/components/ButtonCircle.svelte';
	import loopingVideo from '$lib/assets/images/looping-video.avif';
</script>

<section
	class="m-6 grid grid-cols-[auto_1fr] grid-rows-[repeat(5,auto)] gap-4 border-b-[1px] border-primary pb-4 tablet:grid-cols-[auto_auto_1fr] tablet:grid-rows-[1fr_auto_auto]"
>
	<h1 class="sr-only">The Amoureux House</h1>

	<span aria-hidden="true" class="-mb-[0.146em] block self-end text-h1 max-tablet:row-start-1">
		The
	</span>
	<img
		src={loopingVideo}
		alt="Looping Video"
		class="col-span-2 rounded-2xl shadow-lg shadow-[black]/50 max-tablet:row-start-4"
	/>

	<span
		aria-hidden="true"
		class="col-span-full mt-[0.02333em] mr-[0.05em] -mb-[0.146em] block text-right text-h1 max-tablet:row-start-2"
	>
		Amoureux
	</span>

	<p class="self-end text-body-sm max-tablet:row-start-5 max-tablet:-mt-2 max-tablet:ml-2">
		Featuring Pelagie X<br />A film by Breakwater Studios
	</p>
	<span aria-hidden="true" class="mt-[0.02333em] -mb-[0.146em] block text-h1 max-tablet:row-start-3"
		>House</span
	>
	<div class="relative max-tablet:row-start-3">
		<div class="button-position absolute">
			<ButtonCircle text="Visit The House" href="/" />
		</div>
	</div>
</section>

<style>
	@reference '../../../app.css';

	.button-position {
		@apply right-0 bottom-0;

		@media (width < 28rem) {
			@apply right-auto left-0;
		}

		@media (width < 44rem) {
			@apply top-0 bottom-auto;
		}
	}
</style>
