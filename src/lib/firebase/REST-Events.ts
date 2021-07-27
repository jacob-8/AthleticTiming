import type { IEvent } from '$lib/interfaces/event.interface';
import { projectId } from './config';
import { FireStoreParser } from './RESTParser';
export async function fetchEvents(): Promise<IEvent[]> {
	try {
		const res = await fetch(
			`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`,
			{
				method: 'POST',
				body: JSON.stringify({
					structuredQuery: {
						where: {
							compositeFilter: {
								filters: [
									{
										fieldFilter: {
											field: {
												fieldPath: 'public'
											},
											op: 'EQUAL',
											value: {
												booleanValue: true
											}
										}
									}
								],
								op: 'AND'
							}
						},
						orderBy: [
							{
								field: {
									fieldPath: 'name'
								}
							}
						],
						from: [
							{
								collectionId: 'events'
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
			const data = FireStoreParser<IEvent>(doc.document.fields);
			data.id = doc.document.name.split('/').pop();
			return data;
		});
	} catch (err) {
		throw new Error(err);
	}
}
