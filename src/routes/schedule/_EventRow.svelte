<script>
	import type { IEvent } from '$lib/interfaces/event.interface';
	import { user } from '$lib/stores/user';
	export let event: IEvent;
	let editing = false;
</script>

<tr>
	<td
		class="!text-sm tracking-tight"
		title={new Intl.DateTimeFormat('en-US', {
			weekday: 'long'
		}).format(event.startDate.toDate())}
	>
		{#if event.multiDay}
			{new Intl.DateTimeFormat('en-US', {
				month: 'numeric',
				day: 'numeric'
			}).format(event.startDate.toDate())}-{new Intl.DateTimeFormat('en-US', {
				year: '2-digit',
				month: 'numeric',
				day: 'numeric'
			}).format(event.endDate.toDate())}
		{:else}
			{new Intl.DateTimeFormat('en-US', {
				year: '2-digit',
				month: 'numeric',
				day: 'numeric'
			}).format(event.startDate.toDate())}
		{/if}
	</td>
	<td
		><div class="font-bold flex items-center">
			{#if event.photo}
				<img class="mr-1" alt="" src="https://lh3.googleusercontent.com/{event.photo.gcs}=s84-p" />
			{:else if $user}
				{#await import('$lib/components/photo/ReceiveImage.svelte') then { default: ReceiveImage }}
					<ReceiveImage {event} />
				{/await}
			{/if}
			<a href={event.eventLink} title="Go to Event Page" target="_blank">{event.title}</a>
		</div>
	</td>
	<td>
		<a href={event.resultsLink} target="_blank">
			{event.complete ? 'Complete' : 'LIVE'}
			<span class="hidden sm:inline"> Results </span>
		</a>
	</td>
	<td class="font-bold">
		{event.sport}
		{#if $user}
			<button on:click={() => (editing = true)} type="button" title="Edit Event Details"
				><i class="fas fa-pencil-alt" /></button
			>
		{/if}
	</td>
</tr>

{#if editing}
	{#await import('./_EditEvent.svelte') then { default: EditEvent }}
		<EditEvent
			{event}
			editing={true}
			on:close={() => {
				editing = false;
			}}
		/>
	{/await}
{/if}

<style>
	img {
		width: 42px;
	}
	a,
	button {
		@apply p-2 rounded hover:bg-gray-200;
	}
</style>
