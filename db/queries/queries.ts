
import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDB() {
	if (!db) {
		db = await SQLite.openDatabaseAsync('study-app.db');
	}
	return db;
}



// import * as SQLite from 'expo-sqlite';

// 	const db = await SQLite.openDatabaseAsync('study-app');
	
// 	await db.execAsync(`
// 		PRAGMA journal_mode = WAL;
// 		CREATE TABLE IF NOT EXISTS "class" (id INTEGER PRIMARY KEY, name TEXT NOT NULL, updated_at DATETIME, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
// 	CREATE TABLE IF NOT EXISTS "sets" (
// 		id INTEGER PRIMARY KEY,
// 		name TEXT NOT NULL,
// 		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
// 		class_id INTEGER NOT NULL,
// 		FOREIGN KEY (class_id) REFERENCES class (id)
// 	);
// 	CREATE TABLE IF NOT EXISTS "card" (
// 		id INTEGER PRIMARY KEY,
// 		key TEXT NOT NULL,
// 		value TEXT NOT NULL,
// 		set_id INTEGER NOT NULL,
// 		FOREIGN KEY (set_id) REFERENCES set (id)
// 	);
// 	`)
