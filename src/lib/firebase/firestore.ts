// from https://fireship.io/lessons/firestore-advanced-usage-angularfire/
import { get } from 'svelte/store';
import { user } from '$lib/stores/user';
import type { IUser } from '$lib/interfaces/user.interface';
const getUid = () => {
  const { uid } = get(user) as IUser;
  return uid;
};

type CollectionPredicate<T> = string | firebase.default.firestore.CollectionReference;
type DocPredicate<T> = string | firebase.default.firestore.DocumentReference;

function col<T>(
  ref: CollectionPredicate<T>,
  queryFn?
): firebase.default.firestore.CollectionReference {
  return typeof ref === 'string' ? window.firebase.default.firestore().collection(ref) : ref;
  // <T>
}

function doc<T>(ref: DocPredicate<T>): firebase.default.firestore.DocumentReference {
  return typeof ref === 'string' ? window.firebase.default.firestore().doc(ref) : ref;
}

const getTimestamp = () => {
  return window.firebase.default.firestore.FieldValue.serverTimestamp();
};

export function add<T>(
  ref: CollectionPredicate<T>,
  data: T
): Promise<firebase.default.firestore.DocumentReference> {
  return col(ref).add({
    ...data,
    createdAt: getTimestamp(),
    uploadedAt: getTimestamp(),
    createdBy: getUid(),
    updatedBy: getUid(),
  });
}

export async function set<T>(ref: DocPredicate<T>, data: T, merge = false): Promise<void> {
  const snap = await doc(ref).get();
  return await (snap.exists
    ? update(ref, data)
    : doc(ref).set(
        {
          ...data,
          createdAt: getTimestamp(),
          uploadedAt: getTimestamp(),
          createdBy: getUid(),
          updatedBy: getUid(),
        },
        { merge }
      ));
} // could split apart into set and upsert if desired, https://stackoverflow.com/questions/46597327/difference-between-set-with-merge-true-and-update

export function update<T>(ref: DocPredicate<T>, data: Partial<T>): Promise<void> {
  return doc(ref).update({
    ...data,
    uploadedAt: getTimestamp(),
    updatedBy: getUid(),
  });
}

export function deleteDoc<T>(ref: DocPredicate<T>): Promise<void> {
  return doc(ref).delete();
}
