<script context="module">
  export function load({ error, status }) {
    return {
      props: { error, status },
    };
  }
</script>

<script>
  import { dev } from '$app/env';
  export let status;
  export let error;
</script>

<svelte:head>
  <title>Error: {status}</title>
</svelte:head>

<div class="p-4 bg-white relative z-20">
  <h2 class="text-xl sm:text-4xl font-bold mb-3">We're sorry, but we've run into an error.</h2>

  <p class="text-gray-600 text-sm mt-6">
    <b>{status}
    error</b>:
    {error.message}
  </p>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</div>
