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
	createClass: async (className: string) => {
		try {
			const db = await getDB();
			const newClass = await db.runAsync("INSERT INTO class (name) VALUES (?)", className);
			return newClass;
		} catch (err) {
			console.error(`Error creating class: ${err}`);
			return null;
		}
	},
	updateClass: async () => {
		const db = await getDB();
	},
	deleteClass: async (classId: number) => {
		try {
			const db = await getDB();
			await db.runAsync("DELETE FROM class WHERE id = ?", classId);
		} catch (err) {
			console.error(`Error deleting class: ${err}`);
			throw new Error("Error deleting class, please try again later");
		}
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
	getClassById: async (classId: number): Promise<Class | null> => {
		try {
			const db = await getDB();
			const course = await db.getFirstAsync("SELECT * FROM class WHERE id = ?", classId);
			return course as Class;
		} catch (err) {
			console.error(`Error fetching class: ${err}`);
			return null;
		}
	},
}
