import { Set } from '../types';
import { getDB } from './queries';

export const setQueries = {
	createTable: async () => {
		const db = await getDB();
		await db.execAsync(`
			CREATE TABLE IF NOT EXISTS "sets" (
				id INTEGER PRIMARY KEY,
				name TEXT NOT NULL,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				class_id INTEGER NOT NULL,
				FOREIGN KEY (class_id) REFERENCES class(id));
		`);
	},
	updateSet: async (set: Partial<Set>) => {
		const db = await getDB();
	},
	createSet: async (set: Omit<Set, "created_at" | "updated_at">) => {
		const db = await getDB();
	},
	deleteSet: async (setId: number) => {
		const db = await getDB();
	},
	getSets: async (limit: number = 100) => {
		const db = await getDB();
	},
}