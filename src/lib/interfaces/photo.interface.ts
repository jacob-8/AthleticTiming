export interface IPhoto {
	id?: string;
	path: string;
	gcs: string;
	createdBy?: string;
	updatedBy?: string;
	createdAt?: firebase.default.firestore.Timestamp & firebase.default.firestore.FieldValue;
	uploadedAt?: firebase.default.firestore.Timestamp & firebase.default.firestore.FieldValue; // note that updatedAt is used in other projects as its more parallel
}
