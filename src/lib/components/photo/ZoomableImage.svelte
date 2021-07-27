<script>
	export let gcs: string,
		square: number = undefined,
		width: number = undefined,
		height: number = undefined;
	import { crossfade, scale } from 'svelte/transition';
	const [send, receive] = crossfade({
		duration: 200,
		fallback: scale
	});
	let w: number;
	let loading = false;
	let viewing = false;

	$: src = `https://lh3.googleusercontent.com/${gcs}=w${w >= 768 ? w - 24 : w}`;

	function load() {
		const timeout = setTimeout(() => (loading = true), 100);
		const img = new Image();

		img.onload = () => {
			clearTimeout(timeout);
			loading = false;
			viewing = true;
		};

		img.src = src;
	}

	let key = {};
</script>

<svelte:window bind:innerWidth={w} />

{#if !viewing}
	<img
		class="max-w-full cursor-pointer"
		on:click={load}
		in:receive|local={{ key }}
		out:send|local={{ key }}
		alt=""
		src="https://lh3.googleusercontent.com/{gcs}={square
			? `s${square}-p`
			: width
			? `w${width}`
			: height
			? `h${height}`
			: 's0'}"
	/>
	{#if loading}
		<i class="far fa-spinner fa-pulse absolute bottom-3 right-3 text-white" />
	{/if}
{/if}

{#if viewing}
	<div
		on:click={() => {
			viewing = false;
		}}
		class="fixed inset-0 md:p-3 flex flex-col items-center justify-center z-50"
		in:receive={{ key }}
		out:send={{ key }}
		style="background: rgba(0, 0, 0, 0.85); will-change: transform;"
	>
		<div class="h-full flex flex-col justify-center">
			<div
				class="font-semibold text-white p-4 flex justify-between items-center
          absolute top-0 inset-x-0 bg-opacity-25 bg-black"
			>
				<i class="far fa-times p-3 cursor-pointer ml-auto" />
			</div>
			<img class="object-contain max-h-full" alt="" {src} />
		</div>
	</div>
{/if}
