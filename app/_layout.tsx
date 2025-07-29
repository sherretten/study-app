import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { ActivityIndicator, MD2Colors, PaperProvider } from 'react-native-paper';

export default function RootLayout() {
	async function createDbIfNone(db: SQLiteDatabase) {
		console.log('Creating database');
		try {
			await db.execAsync(`CREATE TABLE IF NOT EXISTS "class" (id INTEGER PRIMARY KEY, name TEXT NOT NULL, updated_at DATETIME, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
			CREATE TABLE IF NOT EXISTS "sets" (id INTEGER PRIMARY KEY, name TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, class_id INTEGER NOT NULL, FOREIGN KEY (class_id) REFERENCES class(id));
			CREATE TABLE IF NOT EXISTS "cards" (id INTEGER PRIMARY KEY, term TEXT NOT NULL, definition TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, set_id INTEGER NOT NULL, FOREIGN KEY (set_id) REFERENCES sets(id));`)
		} catch (err) {
			console.error('Error creating db', err);
		}
	}

	return (
		<PaperProvider>
			<Suspense fallback={<ActivityIndicator animating color={MD2Colors.blue200} />}>
				<SQLiteProvider databaseName='example.db' onInit={createDbIfNone} useSuspense>
					<Stack>
						<Stack.Screen name='index' options={{ title: 'Home' }}></Stack.Screen>
						<Stack.Screen name='classes' options={{ title: 'classes', headerShown: false }}></Stack.Screen>
					</Stack>
				</SQLiteProvider>
			</Suspense>
		</PaperProvider>
	);
}
