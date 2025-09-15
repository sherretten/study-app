import * as SQLite from 'expo-sqlite';

import { Card } from '../types';

const db = await SQLite.openDatabaseAsync('study-app');

export const cardQueries = {
	upsertCard: async (card: Partial<Card>) => {
		const now = new Date().toISOString();
		
		return new Promise((resolve, reject) => {
			db.withTransactionAsync(async () => {
				db.runAsync(`
					INSERT INTO cards (id, term, definition, set_id, created_at)
					VALUES (?, ?, ?, ?, ?)
					ON CONFLICT(id) DO UPDATE SET
						term = excluded.term,
						definition = excluded.definition,
						set_id = excluded.set_id
				`, [
					card.id || null,
					card.term,
					card.definition,
					card.set_id,
					card.created_at || now
				]);
			});
		});
	},
	getCardsBySetId: async (setId: number): Promise<Card[]> => {
	},
	deleteCardById: async (cardId: number) => {},
}