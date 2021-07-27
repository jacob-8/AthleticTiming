<script>
	import Modal from '$lib/components/Modal.svelte';
	import type { IEvent } from '$lib/interfaces/event.interface';
	export let event: IEvent = {
		title: '',
		sport: 'TF',
		multiDay: false,
		startDate: null,
		endDate: null,
		complete: false,
		eventLink: null,
		resultsLink: null
	};

	export let editing = false;

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { add, deleteDoc, set } from '$lib/firebase/firestore';
	import DateInput from './_DateInput.svelte';

	async function save(event: IEvent) {
		if (editing) {
			// @ts-ignore
			delete event.ref;
			await set<IEvent>(`events/${event.id}`, event);
		} else {
			await add<IEvent>(`events`, event);
		}
		dispatch('close');
	}

	$: if (!event.multiDay) {
		event.endDate = null;
	}

	async function removePhoto(path: string) {
		try {
			await window.firebase.default.storage().ref(path).delete();
			event.photo = null;
			await save(event);
			dispatch('close');
		} catch (e) {
			alert(e);
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/js-datepicker/dist/datepicker.min.css" />
</svelte:head>

<Modal on:close>
	<span slot="heading">{editing ? 'Edit' : 'Add'} Event</span>
	<form on:submit|preventDefault={() => save(event)}>
		<input
			class="block mb-2 w-full"
			bind:value={event.title}
			type="text"
			required
			placeholder="Enter Event Title"
		/>
		<div class="mb-1">Start Date</div>
		<DateInput
			date={event.startDate}
			on:datechange={(e) => (event.startDate = e.detail)}
			required={true}
		/>
		<!-- {event.startDate} -->
		<div class="flex items-center my-2">
			<input
				bind:checked={event.multiDay}
				id="multi"
				type="checkbox"
				class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
			/>
			<label for="multi" class="ml-2 block text-sm text-gray-900"> Multiple Days </label>
		</div>
		{#if event.multiDay}
			<div class="mb-1 mt-2">End Date</div>
			<DateInput date={event.endDate} on:datechange={(e) => (event.endDate = e.detail)} />
		{/if}

		<div class="mb-2 flex space-x-4">
			<label class="flex items-center">
				<input type="radio" bind:group={event.sport} value={'TF'} />
				&nbsp;TF
			</label>

			<label class="flex items-center">
				<input type="radio" bind:group={event.sport} value={'XC'} />
				&nbsp;XC
			</label>

			<label class="flex items-center">
				<input type="radio" bind:group={event.sport} value={'RR'} />
				&nbsp;RR
			</label>
		</div>
		<input
			class="block mt-2 mb-2 w-full"
			bind:value={event.eventLink}
			type="text"
			required
			placeholder="Enter Event Page Link"
		/>
		<input
			class="block mb-2 w-full"
			bind:value={event.resultsLink}
			type="text"
			required
			placeholder="Enter Results Link"
		/>
		<div class="flex items-center mb-2">
			<input
				bind:checked={event.complete}
				id="complete"
				type="checkbox"
				class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
			/>
			<label for="complete" class="ml-2 block text-sm text-gray-900"> Complete </label>
		</div>
		{#if event.photo}
			<img
				style="width: 200px;"
				class="mb-2 max-w-full"
				alt=""
				src="https://lh3.googleusercontent.com/{event.photo.gcs}=s400-p"
			/>
		{/if}

		<div class="flex">
			<button
				class="px-3 py-2 bg-primary hover:bg-primary-light text-white rounded font-medium"
				type="submit">Save</button
			>
			<button
				class="px-3 py-2 hover:bg-gray-100 rounded font-medium mr-auto"
				type="button"
				on:click={() => dispatch('close')}>Cancel</button
			>
			{#if event.photo}
				<button
					class="px-3 py-2 hover:bg-red-100 rounded font-medium text-red-700"
					type="button"
					on:click={async () => {
						if (confirm('Remove photo?')) {
							try {
								await removePhoto(event.photo.path);
							} catch (e) {
								alert(e);
							}
							dispatch('close');
						}
					}}>Remove Photo</button
				>
			{/if}
			{#if editing}
				<button
					class="px-3 py-2 hover:bg-red-100 rounded font-medium text-red-700"
					type="button"
					on:click={async () => {
						if (confirm('Delete event?')) {
							try {
								if (event.photo) {
									await window.firebase.default.storage().ref(event.photo.path).delete();
								}
								await deleteDoc(`events/${event.id}`);
								dispatch('close');
							} catch (e) {
								alert(e);
							}
						}
					}}>Delete Event <i class="far fa-trash-alt" /></button
				>
			{/if}
		</div>
	</form>
</Modal>

<style>
	input[type='text'] {
		@apply flex-grow appearance-none block px-3 py-2 border
        border-gray-300 rounded text-gray-900 placeholder-gray-500
        focus:outline-none focus:ring-primary focus:border-primary;
	}
</style>
