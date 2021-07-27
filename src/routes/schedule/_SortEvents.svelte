<script>
	import type { IEvent } from '$lib/interfaces/event.interface';

	export let events: IEvent[] = [];
	enum EventFields {
		startDate = 'Date',
		title = 'Event',
		complete = 'Results',
		sport = 'Sport',
	}

	type SortFields = keyof typeof EventFields;
	//@ts-ignore
	const userFields: {
		key: SortFields;
		value: EventFields;
	}[] = Object.entries(EventFields).map(([key, value]) => {
		return { key, value };
	});

	let sortKey: SortFields = 'startDate';
	let sortDescending = true;

	$: sortedEvents = events.sort((a, b) => {
		let valueA: string | number | boolean;
		let valueB: string | number | boolean;
		// prettier-ignore
		switch (sortKey) {
      case 'complete':
        valueA = a.complete || false;
        valueB = b.complete || false;
        break;
      case 'startDate':
        valueA = a.startDate && a.startDate.seconds || 0;
        valueB = b.startDate && b.startDate.seconds || 0;
        break;
      default: 
        valueA = a[sortKey] ? a[sortKey].toUpperCase() : 'zz'; // if we ever have missing names or email, then pass 'zz' when the sortKey is undefined
        valueB = b[sortKey] ? b[sortKey].toUpperCase() : 'zz';
        // a[sortKey].localeCompare(b[sortKey])
    }
		if (valueA < valueB) {
			return sortDescending ? -1 : 1;
		}
		if (valueA > valueB) {
			return sortDescending ? 1 : -1;
		}
		return 0;
	});

	function setSortSettings(paraSortKey: SortFields) {
		if (sortKey === paraSortKey) {
			sortDescending = !sortDescending;
		} else {
			sortKey = paraSortKey;
		}
	}
</script>

{#each userFields as field}
	<th
		class="cursor-pointer"
		class:!pl-4={field.key === "complete"}
		on:click={() => setSortSettings(field.key)}
		title="Click to sort asc/desc"
	>
		{field.value}
		{#if sortKey === field.key}
			{#if sortDescending}
				<i class="fas fa-sort-amount-down" />
			{:else}
				<i class="fas fa-sort-amount-up" />
			{/if}
		{/if}
	</th>
{/each}

<slot {sortedEvents} />
