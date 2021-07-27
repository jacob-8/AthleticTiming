<script>
	export let year: number | 'All', sport: 'XC' | 'TF' | 'RR' | 'All' | string;
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let years = [];
	let mounted = false;
	onMount(() => {
		let firstYear = 2015;
		const currentYear = new Date().getFullYear();
		while (firstYear < currentYear + 1) {
			years.unshift(firstYear++);
		}
		years = years;
		mounted = true;
	});

	function selectYear(e) {
		const year = e.target.value;
		goto(`/schedule/${year}?sport=${sport}`);
	}
	function selectSport(e) {
		const sport = e.target.value;
		goto(`/schedule/${year}?sport=${sport}`);
	}
</script>

<div class="flex justify-between mb-2">
	{#if mounted}
		<!-- svelte-ignore a11y-no-onchange -->
		<select value={year} on:change={selectYear}>
			{#each years as year}
				<option value={year}>{year} Events</option>
			{/each}
			<option value={'All'}>All Events</option>
		</select>

		<!-- svelte-ignore a11y-no-onchange -->
		<select value={sport} on:change={selectSport}>
			<option value={'XC'}>Cross Country</option>
			<option value={'TF'}>Track & Field</option>
			<option value={'RR'}>Road Racing</option>
			<option value="All">
				{#if sport === 'All'}
					Filter by Sport
				{:else}
					<span>All Sports</span>
				{/if}
			</option>
		</select>
	{/if}
</div>

<style>
	select {
		@apply rounded block pl-3 pr-8 py-2 text-base leading-6 border-transparent font-semibold focus:ring-primary focus:border-primary;
	}
</style>
