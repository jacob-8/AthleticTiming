<script>
	import type { IEvent } from '$lib/interfaces/event.interface';
	import Dropzone from './Dropzone.svelte';
	import UploadImage from './UploadImage.svelte';
	export let event: IEvent = undefined;
	let file: File;

	async function handleImage(files: FileList) {
		const fileToCheck = files.item(0);
		if (fileToCheck.type.split('/')[0] !== 'image') {
			return alert('Unsupported File Type');
		}
		// Must be smaller than 20MB, http://www.unitconversion.org/data-storage/megabytes-to-bytes-conversion.html
		if (fileToCheck.size > 20971520) {
			return alert('Photos must be smaller than 20MB');
		}
		file = fileToCheck;
	}
</script>

{#if !file}
	<Dropzone on:addedfile={(event) => handleImage(event.detail)}>
		{#if event}
			<div class="my-1">
				<i class="fas fa-plus" />
				<i class="fas fa-image" />
			</div>
		{:else}
			<div class="m-9 text-center">
				<div class="font-semibold mb-2">Add Photo</div>
				<span class="hidden md:inline"> Drag and drop or choose a file... </span>
				<span class="md:hidden"> Choose file / take a photo... </span>
			</div>
		{/if}
	</Dropzone>
{:else}
	<div style="max-width: 42px;">
		<UploadImage {file} {event} />
	</div>
{/if}
