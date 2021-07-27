// Firestore REST API
// https://cloud.google.com/firestore/docs/use-rest-api leads to https://cloud.google.com/firestore/docs/reference/rest/?apix=true
// https://www.jeansnyman.com/Firebase/Google-Firestore-REST-API-Examples

import { dev } from '$app/env';
export const projectId = dev ? 'athletic-timing-dev' : 'athletic-timing-prod';

// function firestoreRESTUrl(path: string): string {
//   return `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${path}`;
// }
// export async function fetchDoc<T>(collection: string, id: string): Promise<T> {
//   const url = firestoreRESTUrl(`${collection}/${id}`);
//   const res = await fetch(url);
//   const json = await res.json();
//   if (json && json.fields) {
//     const doc = FireStoreParser<T>(json.fields);
//     // @ts-ignore
//     doc.id = id;
//     return doc;
//   }
//   return null;
// }

let firebaseInitialized = false;
export async function firebaseReady(): Promise<boolean> {
  if (firebaseInitialized) return true;
  return new Promise((resolve) => {
    let timer;
    (function check() {
      console.log('checking for firebase');
      if (
        window &&
        window.firebase &&
        window.firebase.default &&
        window.firebase.default.apps &&
        window.firebase.default.apps.length
      ) {
        clearTimeout(timer);
        firebaseInitialized = true;
        resolve(true);
        return;
      }
      timer = setTimeout(check, 30);
    })();
  });
}