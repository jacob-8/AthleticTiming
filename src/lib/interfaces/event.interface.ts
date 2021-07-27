import type { IPhoto } from "./photo.interface";

export interface IEvent {
    id?: string;
    title: string;
    sport: 'TF' | 'XC' | 'RR';
    startDate: firebase.default.firestore.Timestamp & firebase.default.firestore.FieldValue
    multiDay: boolean;
    endDate: firebase.default.firestore.Timestamp & firebase.default.firestore.FieldValue;
    complete: boolean;
    eventLink: string;
    resultsLink: string;
    photo?: IPhoto;
}
