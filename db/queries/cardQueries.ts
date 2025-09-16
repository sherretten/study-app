import { Card } from '../types';
import { getDB } from './queries';

export const cardQueries = {
	createTable: async () => {
		const db = await getDB();
		await db.runAsync(`
			CREATE TABLE IF NOT EXISTS "cards" (
			id INTEGER PRIMARY KEY,
			term TEXT NOT NULL,
			definition TEXT NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			set_id INTEGER NOT NULL,
			FOREIGN KEY (set_id) REFERENCES sets(id));
		`)
	},
	upsertCard: async (card: Partial<Card>) => {
		const db = await getDB();
		const now = new Date().toISOString();
		
		return new Promise((resolve, reject) => {
			db.withTransactionAsync(async () => {
				await db.runAsync(`
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
	getCardsBySetId: async (setId: number): Promise<Card[] | null> => {
		try {
			const db = await getDB();
			const cards = await db.getAllAsync<Card>("SELECT * FROM cards WHERE set_id = ?;", setId);
			return cards;
		} catch (err) {
			console.error(`Error getting cards by set id ${err}`)
			return null;
		}
	},
	deleteCardById: async (cardId: number) => {
		try {
			const db = await getDB();
			await db.runAsync("DELETE from cards WHERE id = ?", cardId);
		} catch (err) {
			console.error(`Error deleting card: ${err}`);
			return;
		}
	},
}
