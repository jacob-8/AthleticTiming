<script>
	export let date: Date | firebase.default.firestore.Timestamp;
	export let required = false;
	let dateToDisplay: string = undefined;
	$: {
		if (date) {
			let dateValue = date instanceof Date ? date : date.toDate();
			let dd: string | number = dateValue.getDate();
			let mm: string | number = dateValue.getMonth() + 1;
			if (dd < 10) {
				dd = '0' + dd;
			}
			if (mm < 10) {
				mm = '0' + mm;
			}
			dateToDisplay = `${dateValue.getFullYear()}-${mm}-${dd}`;
		}
	}
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function onChange(e) {
		const dateString: string = e.target.value; //valueAsDate
		const year = +dateString.split('-')[0];
		const month = +dateString.split('-')[1] - 1;
		const day = +dateString.split('-')[2];
		if (typeof year === 'number') {
			dispatch('datechange', new Date(year, month, day));
		} else {
			dispatch('datechange', null);
		}
	}
</script>

<input value={dateToDisplay} on:change={onChange} type="date" {required} />

<style>
	input[type='date'] {
		@apply flex-grow appearance-none block px-3 py-2 border
        border-gray-300 rounded text-gray-900 placeholder-gray-500
        focus:outline-none focus:ring-primary focus:border-primary;
	}
</style>
