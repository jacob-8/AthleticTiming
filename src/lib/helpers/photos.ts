export async function deletePhoto(photoId: string, photoPath: string) {
	try {
		const ref = window.firebase.default.storage().ref(photoPath);
		const deleteFromFireStorage = ref.delete();
		const deleteFromFirestore = window.firebase.default
			.firestore()
			.doc(`photos/${photoId}`)
			.delete();
		await Promise.all([deleteFromFireStorage, deleteFromFirestore]);
		alert(`Photo deleted`);
		location.reload();
	} catch (err) {
		alert(`Error deleting photo. Error: ${err}`);
	}
}
