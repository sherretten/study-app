import * as SQLite from 'expo-sqlite';


const db = await SQLite.openDatabaseAsync('study-app');

await db.execAsync(`
	PRAGMA journal_mode = WAL;
	CREATE TABLE IF NOT EXISTS class (id INTEGER PRIMARY KEY, name TEXT NOT NULL, updated_at DATETIME, created_at DATETIME DEFAULT NOW  )
	CREATE TABLE IF NOT EXISTS set (id INTEGER PRIMARY KEY, FOREIGN KEY(class_id) REFERENCES class(id),  name TEXT NOT NULL, created_at DATETIME DEFAULT NOW)
	CREATE TABLE IF NOT EXISTS card (id INTEGER PRIMARY KEY, FOREIGN KEY(set_id) REFERENCES sets(id) key TEXT NOT NULL, value TEXT NOT NULL)
`)