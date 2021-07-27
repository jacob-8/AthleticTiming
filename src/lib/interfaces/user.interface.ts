export interface IUser {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: firebase.default.firestore.Timestamp & firebase.default.firestore.FieldValue;
    uploadedAt?: firebase.default.firestore.Timestamp & firebase.default.firestore.FieldValue;
}
