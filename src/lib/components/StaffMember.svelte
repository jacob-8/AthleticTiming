<script>
	export let name: string;
	export let title: string = undefined;
	export let imageURL: string = undefined;
</script>

<div class="space-y-4">
	{#if imageURL}
		<div class="aspect-w-3 aspect-h-2">
			<img class="object-cover shadow-lg rounded-lg" src={imageURL} alt={name} />
		</div>
	{/if}
	<div class="text-lg leading-6 font-medium space-y-1">
		<h3>{name}</h3>

		{#if title}
			<p>{title}</p>
		{/if}
	</div>
	<slot />
</div>

<style>
	p {
		@apply text-primary;
	}
</style>