import * as SQLite from 'expo-sqlite';
import { Set } from '../types';

const db = await SQLite.openDatabaseAsync('study-app');

export const SetQueries = {
	updateSet: async (set: Partial<Set>) => {},
	createSet: async (set: Omit<Set, "created_at">) => {},
	deleteSet: async (setId: Pick<Set, "id">) => {},
	getSets: async (limit: number = 100) => {},
}