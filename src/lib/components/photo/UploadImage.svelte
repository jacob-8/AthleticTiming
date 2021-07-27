<script>
	export let file: File,
		event: IEvent = undefined;

	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	let progress = tweened(0, {
		duration: 2000,
		easing: cubicOut
	});
	$: percentage = Math.floor($progress * 100);

	let error;
	let success: boolean;
	let previewURL: string;

	if (file) {
		previewURL = URL.createObjectURL(file);
		startUpload();
	}

	async function startUpload() {
		const fileSuffix = /\.[0-9a-z]+$/i;
		const fileTypeSuffix = file.name.match(fileSuffix)[0];
		const storagePath = `${event ? 'events/' : ''}${new Date().getTime()}${fileTypeSuffix}`;

		const customMetadata = {
			uploadedBy: $user.displayName,
			originalFileName: file.name
		};

		// https://firebase.google.com/docs/storage/web/upload-files
		const uploadTask = window.firebase.default
			.storage()
			.ref(storagePath)
			.put(file, { customMetadata });

		uploadTask.on(
			window.firebase.default.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
			function (snapshot) {
				const progressAmount = snapshot.bytesTransferred / snapshot.totalBytes;
				progress.set(progressAmount);
				// switch (snapshot.state) {
				//   case firebase.storage.TaskState.PAUSED: // or 'paused'
				//     console.log("Upload is paused");
				//     break;
				//   case firebase.storage.TaskState.RUNNING: // or 'running'
				//     console.log("Upload is running");
				//     break;
				// }
			},
			function (err) {
				alert('Image Upload Failed');
				error = err;
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				// switch (error.code) {
				//     case 'storage/unauthorized':
				//         // User doesn't have permission to access the object
				//         break;

				//     case 'storage/canceled':
				//         // User canceled the upload
				//         break;

				//     case 'storage/unknown':
				//         // Unknown error occurred, inspect error.serverResponse
				//         break;
				// }
			},
			() => savePhoto(storagePath)
		);
	}

	import { add, update } from '$lib/firebase/firestore';
	import { dev } from '$app/env';
	import type { IPhoto } from '$lib/interfaces/photo.interface';
	import { user } from '$lib/stores/user';
	import type { IEvent } from '$lib/interfaces/event.interface';
	import { photoURL } from '$lib/var';

	async function savePhoto(storagePath: string) {
		try {
			const imageProcessingUrl = `${photoURL}/athletic-timing-${
				dev ? 'dev' : 'prod'
			}.appspot.com/${storagePath}`;

			const result = await fetch(imageProcessingUrl);
			const url = await result.text();
			const gcsPath = url.replace('http://lh3.googleusercontent.com/', '');

			const image: IPhoto = {
				path: storagePath,
				gcs: gcsPath
			};

			if (event) {
				await update<IEvent>(`events/${event.id}`, { photo: image });
			} else {
				await add<IPhoto>('photos', image);
				location.reload();
			}
		} catch (err) {
			error = err;
			alert(`Error Uploading Image: ${err}`);
		}
	}
</script>

<div
	class="w-full h-full relative flex flex-col items-center justify-center
    overflow-hidden"
>
	{#if error}
		<div class="text-red-600 text-center">
			<i class="fas fa-times" />
			Error: {error}
		</div>
	{:else}
		{#if success}
			<div class="text-dark-shadow text-white z-10 text-center">
				<i class="fas fa-check fa-lg" />
			</div>
		{:else}
			<div
				class="text-dark-shadow text-white z-10 font-semibold text-center
          font-mono p-2"
			>
				{percentage}%
			</div>
		{/if}
		{#if previewURL}
			<img class="object-cover h-full w-full absolute inset-0" alt="" src={previewURL} />
		{/if}
		<div style="height:{100 - percentage}%" class="bg-gray-200 opacity-75 absolute top-0 w-full" />
	{/if}
</div>

<style>
	.text-dark-shadow {
		text-shadow: -1px -1px 0 hsl(0, 0%, 25%), 1px -1px 0 hsl(0, 0%, 25%), -1px 1px 0 hsl(0, 0%, 25%),
			1px 1px 0 hsl(0, 0%, 25%);
	}
</style>
