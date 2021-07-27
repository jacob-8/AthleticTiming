import type { IPhoto } from '$lib/interfaces/photo.interface';
import { projectId } from './config';
import { FireStoreParser } from './RESTParser';

export async function fetchPhotos(): Promise<IPhoto[]> {
	try {
		const res = await fetch(
			`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`,
			{
				method: 'POST',
				body: JSON.stringify({
					structuredQuery: {
						orderBy: [
							{
								field: {
									fieldPath: 'uploadedAt'
								},
								direction: 'DESCENDING'
							}
						],
						from: [
							{
								collectionId: 'photos'
							}
						]
					}
				}),
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			}
		);
		const json = await res.json();
		return json.map((doc: { document: { fields: Record<string, unknown>; name: string } }) => {
			const data = FireStoreParser<IPhoto>(doc.document.fields);
			data.id = doc.document.name.split('/').pop();
			return data;
		});
	} catch (err) {
		throw new Error(err);
	}
}
