<script>
  export let path:
    | firebase.default.firestore.CollectionReference<firebase.default.firestore.DocumentData>
    | string;
  export let queryFn: (
    ref: firebase.default.firestore.CollectionReference
  ) => firebase.default.firestore.Query<firebase.default.firestore.DocumentData> = null;
  // const queryFn = (ref: firebase.default.firestore.CollectionReference) => ref.where('role', '==', 'contributor');
  export let log = false;
  type T = $$Generic;
  export let startWith: T[] = undefined;
  export let maxWait = 10000;
  export let once = false;

  import { onDestroy, onMount, createEventDispatcher } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';
  import { collectionStore } from './collectionStore';

  const opts = {
    startWith,
    log,
    maxWait,
    once,
  };

  let store = collectionStore<T>(path, queryFn, opts);

  const dispatch = createEventDispatcher();

  let unsub: Unsubscriber;

  // Props changed
  $: {
    if (unsub) {
      unsub();
      store = collectionStore(path, queryFn, opts);
      dispatch('ref', { ref: store.ref });
    }

    unsub = store.subscribe((data) => {
      dispatch('data', {
        data,
      });
    });
    // use emitted data with on:data={(e) => console.log(e.detail.data)}
  }

  onMount(() => dispatch('ref', { ref: store.ref }));
  onDestroy(() => unsub());
</script>

<slot name="before" />
{#if $store}
  <slot
    data={$store}
    ref={store.ref}
    error={store.error}
    first={store.meta.first}
    last={store.meta.last} />
{:else if store.loading}
  <slot name="loading" />
{:else}
  <slot name="fallback" />
{/if}
<slot name="after" />
