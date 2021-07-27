<script context="module">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async () => {
		return { status: 302, redirect: `/schedule/${new Date().getFullYear().toString()}` };
	};
</script>
