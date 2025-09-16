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
	upsertCards: async (cards: Partial<Card>[], setId: number) => {
		const db = await getDB();
		
		await db.withTransactionAsync(async () => {
			for (const card of cards) {
				console.debug(card.id || crypto.randomUUID(), card.term, card.definition, card.set_id);
				await db.runAsync(`
					INSERT INTO cards (id, term, definition, set_id)
					VALUES (?, ?, ?, ?)
					ON CONFLICT(id) DO UPDATE SET
						term = excluded.term,
						definition = excluded.definition,
						set_id = excluded.set_id;
				`,
					card.id || crypto.randomUUID(),
					card.term,
					card.definition,
					setId
				);
			}
		});
	},
	createCards: async (cards: Omit<Card, 'id' | 'created_at'>[], setId: number) => {
		try {
			const db = await getDB();
			await db.withTransactionAsync(async () => {
				for (const card of cards) {
					await db.runAsync("INSERT INTO cards (term, definition, set_id) VALUES (?, ?, ?);", [card.term, card.definition, setId]);
				}
			})
			return;
		} catch (err) {
			console.error(`Error creating cards: ${err}`);
			return;
		}
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
