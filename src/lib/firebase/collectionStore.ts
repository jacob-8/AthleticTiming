import { browser } from '$app/env';
import { writable } from 'svelte/store';

export function collectionStore<T>(
  path:
    | firebase.default.firestore.CollectionReference<firebase.default.firestore.DocumentData>
    | string,
  queryFn: (
    ref: firebase.default.firestore.CollectionReference
  ) => firebase.default.firestore.Query<firebase.default.firestore.DocumentData>,
  opts: { log?: boolean; startWith?: T[]; maxWait?: number; once?: boolean } = {
    maxWait: 10000,
  }
) {
  const { startWith, log, maxWait, once, idField, refField } = {
    idField: 'id',
    refField: 'ref',
    ...opts,
  };

  if (!browser) {
    const store = writable<T[]>(startWith);
    const { subscribe } = store;
    return {
      subscribe,
      firestore: undefined,
      ref: undefined,
      get loading() {
        return false;
      },
      get error() {
        return false;
      },
      get meta() {
        return { first: null, last: null };
      },
    };
  }

  const firestore = window.firebase.default.firestore();

  const ref = typeof path === 'string' ? firestore.collection(path) : path;
  const query = queryFn && queryFn(ref);

  let _loading = typeof startWith !== undefined;
  let _error = null;
  let _meta = { first: null, last: null };
  let _teardown;
  let _waitForIt;

  // Metadata for result
  const calcMeta = (val) => {
    return val && val.length
      ? { first: val[0], last: val[val.length - 1] }
      : { first: null, last: null };
  };

  const next = (val: any[], err?: Error) => {
    _loading = false;
    _waitForIt && clearTimeout(_waitForIt);
    _error = err || null;
    _meta = calcMeta(val);
    set(val);
  };

  const start = () => {
    _waitForIt =
      maxWait &&
      setTimeout(
        () => _loading && next(null, new Error(`Timeout at ${maxWait}. Using fallback slot.`)),
        maxWait
      );

    _teardown = (query || ref).onSnapshot(
      (snapshot) => {
        // Will always return an array
        const data = snapshot.docs.map((docSnap) => ({
          ...docSnap.data(),
          // Allow end user override fields mapped for ID and Ref
          ...(idField ? { [idField]: docSnap.id } : null),
          ...(refField ? { [refField]: docSnap.ref } : null),
        }));

        if (log) {
          const type = _loading ? 'New Query' : 'Updated Query';
          console.groupCollapsed(`${type} ${ref.id} | ${data.length} hits`);
          console.log(`${ref.path}`);
          console.table(data);
          console.groupEnd();
        }
        next(data);
        once && _teardown();
      },

      (error) => {
        console.error(error);
        next(null, error);
      }
    );

    return () => _teardown();
  };

  const store = writable<T[]>(startWith, start);
  const { subscribe, set } = store;

  return {
    subscribe,
    firestore,
    ref,
    get loading() {
      return _loading;
    },
    get error() {
      return _error;
    },
    get meta() {
      return _meta;
    },
  };
}
