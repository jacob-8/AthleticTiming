<script context="module">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ page: { params } }) => {
		if (params.year === 'All') {
			return { props: { year: params.year } };
		} else {
			return { props: { year: +params.year } };
		}
	};
</script>

<script>
	import Collection from '$lib/firebase/Collection.svelte';
	import type { IEvent } from '$lib/interfaces/event.interface';
	import { user } from '$lib/stores/user';
	import Filter from './_Filter.svelte';
	import EventRow from './_EventRow.svelte';
	import ResponsiveTable from './_ResponsiveTable.svelte';
	import SortEvents from './_SortEvents.svelte';
	import Selections from './_Selections.svelte';
	let eventsType: IEvent[] = [];
	export let year: number | 'All';
	import { page } from '$app/stores';
	import RecentAndUpcomingEvents from './_RecentAndUpcomingEvents.svelte';
	$: sport = $page.query.get('sport') || 'All';
	$: queryFn = (ref: firebase.default.firestore.CollectionReference) => {
		if (year === 'All') {
			return ref.orderBy('startDate');
		} else {
			const start = new Date(`${year}-01-01`);
			const end = new Date(`${year + 1}-01-01`);
			return ref.orderBy('startDate').where('startDate', '>', start).where('startDate', '<', end);
		}
	};
	let adding = false;
</script>

<div class="p-2 sm:p-4 md:p-8">
	<RecentAndUpcomingEvents />

	<Selections bind:year {sport} />
	<Collection path="events" {queryFn} startWith={eventsType} let:data={events}>
		<Filter items={events} let:filteredItems={filteredEvents} placeholder="Search for an event">
			<div slot="right">
				{#if $user}
					<button
						type="button"
						on:click={() => (adding = true)}
						class="px-3 py-2 bg-primary hover:bg-primary-light text-white rounded font-medium"
					>
						<i class="fas fa-plus" /> Add Event
					</button>
				{/if}
			</div>

			<ResponsiveTable class="my-1">
				<SortEvents events={filteredEvents} let:sortedEvents>
					{#each sortedEvents as event}
						{#if sport === 'All' || event.sport === sport}
							<EventRow {event} />
						{/if}
					{/each}
				</SortEvents>
			</ResponsiveTable>
		</Filter>
	</Collection>
</div>

{#if adding}
	{#await import('./_EditEvent.svelte') then { default: EditEvent }}
		<EditEvent
			on:close={() => {
				adding = false;
			}}
		/>
	{/await}
{/if}
