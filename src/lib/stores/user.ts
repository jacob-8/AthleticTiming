import { writable } from 'svelte/store';
import type { IUser } from '$lib/interfaces/user.interface';
import { browser } from '$app/env';
import { firebaseReady } from '$lib/firebase/config';

const userKey = 'firebase_user';

function createUserStore() {
	const { subscribe, set } = writable<IUser>(null);
	let _unsubscribeUserDoc: () => void;

	async function listen() {
		let cached = null;
		cached = JSON.parse(localStorage.getItem(userKey));
		set(cached);

		await firebaseReady();
		window.firebase.default.auth().onAuthStateChanged(
			(u) => {
				if (u) {
					_unsubscribeUserDoc = window.firebase.default
						.firestore()
						.doc(`users/${u.uid}`)
						.onSnapshot(
							(snapshot) => {
								const user = snapshot.data() as IUser;
								if (user) {
									console.log('retrieved: ', user);
									set(user);
									cacheUser(user);
								}
							},
							(err) => console.error(err)
						);
				} else {
					set(null);
					removeCachedUser();
				}
			},
			(err) => console.error(err.message)
		);
	}

	if (browser) {
		listen();
	}

	const signOut = async () => {
		_unsubscribeUserDoc && _unsubscribeUserDoc();
		await window.firebase.default.auth().signOut();
	};

	return {
		subscribe,
		signOut
	};
}

export const user = createUserStore();

function cacheUser(user: IUser) {
	localStorage.setItem(userKey, JSON.stringify(user));
}

function removeCachedUser() {
	localStorage.removeItem(userKey);
	const yesterday = new Date(new Date());
	yesterday.setDate(yesterday.getDate() - 1);
}
