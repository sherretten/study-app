import { Class } from '../types';
import { getDB } from './queries';

export const classQueries = {
	createTable: async () => {
		const db = await getDB();
		await db.runAsync(`
			CREATE TABLE IF NOT EXISTS "class" (
			id INTEGER PRIMARY KEY,
			name TEXT NOT NULL,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
			);`)
	},
	createClass: async (Class: Omit<Class, 'id' | 'updated_at' |'created_at'>) => {
		const db = await getDB();
	},
	updateClass: async () => {
		const db = await getDB();
	},
	deleteClass: async (classId: Pick<Class, "id">) => {
		const db = await getDB();
	},
	getClasses: async (): Promise<Class[]> => {
		try {
			const db = await getDB();
			const classes = await db.getAllAsync("SELECT * FROM class")
			return classes as Class[] || [];
		} catch (err) {
			console.error(`Error getting classes: ${err}`);
			return [];
		}
	},
	getClassById: async () => {
		const db = await getDB();
	},
}
