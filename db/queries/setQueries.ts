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
	createSet: async (set: Omit<Set, 'created_at' | 'updated_at' | 'id'>): Promise<number | null> => {
		try {
			const db = await getDB();
			const newSet = await db.runAsync("INSERT INTO sets (name, class_id) values (?, ?);", set.name, set.class_id);
			return newSet.lastInsertRowId;
		} catch (err) {
			console.error(`Error creating set: ${err}`);
			return null;
		}
	},
	deleteSet: async (setId: number) => {
		const db = await getDB();
	},
	getSets: async (limit: number = 100): Promise<Set[] | null> => {
		try {
			const db = await getDB();
			const sets = await db.getAllAsync<Set>("SELECT * FROM sets LIMIT ?", limit);
			return sets;
		} catch (err) {
			console.error(`Error getting sets ${err}`)
			return null;
		}
	},
	getSetsByClassId: async (courseId: number): Promise<Set[] | null> => {
		try {
			const db = await getDB();
			const sets = db.getAllAsync<Set>("SELECT * FROM sets WHERE class_id = ?", courseId);
			return sets;
		} catch (err) {
			console.error(`Error getting sets by class id: ${err}`)
			return null;
		}
	},
	getSetById: async (setId: number): Promise<Set | null> => {
		try {
			const db = await getDB();
			const sets = db.getFirstAsync<Set>("SELECT * FROM sets WHERE id = ?;", setId);
			return sets;
		} catch (err) {
			console.error(`Error getting sets by id: ${err}`)
			return null;
		}
	},
	getRecentlyUpdatedSets: async (): Promise<Set[] | null> => {
		try {
			const db = await getDB();
			const sets = db.getAllAsync<Set>("SELECT * FROM sets ORDER BY updated_at DESC LIMIT 5");
			return sets;
		} catch (err) {
			console.error(`Error getting recently used sets: ${err}`);
			return null;
		}
	}
}