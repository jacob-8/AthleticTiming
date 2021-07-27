<script context="module">
	import { fetchPhotos } from '$lib/firebase/REST-Photos';

	import type { Load } from '@sveltejs/kit';
	export const load: Load = async () => {
		try {
			const photos = await fetchPhotos();
			return { props: { photos } };
		} catch (error) {
			return {
				error // status: res.status,
			};
		}
	};
</script>

<script>
	import type { IPhoto } from '$lib/interfaces/photo.interface';
	import ZoomableImage from '$lib/components/photo/ZoomableImage.svelte';
	import { deletePhoto } from '$lib/helpers/photos';
	import { user } from '$lib/stores/user';
	export let photos: IPhoto[] = [];
</script>

<div class="p-4 md:p-8">
	<h2>Photos</h2>
	{#if $user}
		{#await import('$lib/components/photo/ReceiveImage.svelte') then { default: ReceiveImage }}
			<div class="mb-2" style="height: 160px;">
				<ReceiveImage />
			</div>
		{/await}
	{/if}
	<div
		style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 7px;"
	>
		{#each photos as photo}
			<div class="relative">
				<ZoomableImage gcs={photo.gcs} square={600} />
				{#if $user}
					<button type="button" on:click={() => deletePhoto(photo.id, photo.path)}
						><i class="far fa-trash-alt text-red-700" /></button
					>
				{/if}
			</div>
		{/each}
	</div>
</div>

<!-- How to prevent body from scrolling when overlay is on
http://luxiyalu.com/scrolling-on-overlay/ -->
<style>
	h2 {
		@apply text-3xl font-bold tracking-tight sm:text-4xl mb-4 md:mb-8 text-primary;
	}

	button {
		@apply absolute px-3 py-2 bg-white hover:bg-gray-100 rounded font-medium shadow-md top-[2px] right-[2px];
	}
</style>
