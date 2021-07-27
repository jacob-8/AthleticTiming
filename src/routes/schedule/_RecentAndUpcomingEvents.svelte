<script>
	import Collection from '$lib/firebase/Collection.svelte';
	import type { IEvent } from '$lib/interfaces/event.interface';
	import EventRow from './_EventRow.svelte';
	import ResponsiveTable from './_ResponsiveTable.svelte';
	export let context: 'home' = undefined;

	let eventsType: IEvent[] = [];
	const twoDaysAgo = new Date();
	twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
	const today = new Date();
</script>

<Collection
	path="events"
	queryFn={(ref) =>
		ref.orderBy('startDate').where('startDate', '>', twoDaysAgo).where('startDate', '<', today)}
	startWith={eventsType}
	let:data={recentEvents}
>
	<Collection
		path="events"
		queryFn={(ref) => ref.orderBy('startDate').where('startDate', '>', today).limit(5)}
		startWith={eventsType}
		let:data={upcomingEvents}
	>
		{#if (recentEvents && recentEvents.length) || (upcomingEvents && upcomingEvents.length)}
			<div class:home={context === 'home'}>
				<h3 class="text-xl font-semibold mb-2">Recent & Upcoming Events</h3>
				<ResponsiveTable class="mb-2">
					{#each recentEvents as event}
						<EventRow {event} />
					{/each}
					{#each upcomingEvents as event}
						<EventRow {event} />
					{/each}
				</ResponsiveTable>
			</div>
		{/if}
	</Collection>
</Collection>

<style>
	.home {
		@apply my-4;
	}
	.home h3 {
		@apply text-center;
	}
</style>
