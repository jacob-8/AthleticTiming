<script>
	import type { IUser } from '$lib/interfaces/user.interface';

	import { user } from '$lib/stores/user';
import { photoURL } from '$lib/var';
	async function login() {
		const provider = new window.firebase.default.auth.GoogleAuthProvider();
		try {
			const credential = await window.firebase.default.auth().signInWithPopup(provider);
			await updateUserData(credential.user);
			return credential.user.uid;
		} catch (error) {
			throw alert(`Trouble logging in: ${error}`);
		}
	}

	async function updateUserData(user: IUser, enteredName?: string) {
		const data: IUser = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName || enteredName,
			photoURL: user.photoURL || null
		};

		if (user.email.endsWith('athletic.net' || 'athletictiming.net')) {
			return window.firebase.default.firestore().doc(`users/${user.uid}`).set(data);
		} else {
			throw new Error('Access Denied. Please contact Dan for help.');
		}
	}
</script>

<div class="p-8">
	{#if $user}
		<h3 class="text-2xl">Hi, {$user.displayName}</h3>
		<p class="mb-2">{$user.email}</p>
		<img alt={$user.displayName} style="max-width: 150px;" src={$user.photoURL} />
		<br />
		<button on:click={user.signOut} style="margin: 10px 0 40px;">Logout</button>
	{:else}
		<button on:click={login} style="margin: 40px 0;">
			<i class="fab fa-google" /> Connect with Google
		</button>
	{/if}
</div>

<style>
	button {
		@apply px-3 py-2 bg-primary hover:bg-primary-light text-white rounded font-medium shadow-md;
	}
</style>