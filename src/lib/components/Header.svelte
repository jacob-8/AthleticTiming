<script>
	import { user } from '$lib/stores/user';
</script>

<header>
	<a sveltekit:prefetch href="/" style="margin-right: auto;">
		<img
			alt="Athletic Timing"
			style="max-width: 144px; width: 100%; margin-top: 4px;"
			src="/AT-logo.svg"
		/>
	</a>

	<a sveltekit:prefetch href={`/schedule`}>
		Results
		<span class="ml-1 hidden sm:inline">/ Schedule</span>
	</a>

	<a sveltekit:prefetch href="/photos">
		<i class="far fa-images fa-lg sm:hidden" />
		<span class="ml-1 hidden sm:inline"> Photos </span>
	</a>

	<a sveltekit:prefetch href="/staff">
		<i class="fas fa-users sm:hidden" />
		<span class="ml-1 hidden sm:inline"> Staff </span>
	</a>

	{#if $user}
		<a sveltekit:prefetch href="/login">
			<img alt="" class="profile" src={$user.photoURL} />
		</a>
	{/if}
</header>

<style>
	header {
		height: 56px;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);
		@apply text-white z-50 fixed top-0 w-full flex items-center bg-primary;
	}
	a {
		@apply py-1.5 px-3;
	}
	.profile {
		max-width: 40px;
		border-radius: 50%;
		vertical-align: middle;
		margin-left: 6px;
	}
</style>
