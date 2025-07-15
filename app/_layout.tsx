import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { Text } from 'react-native';

export default function RootLayout() {
	async function createDbIfNone(db: SQLiteDatabase) {
		console.log('Creating database');
		await db.execAsync(`CREATE TABLE IF NOT EXISTS "class" (id INTEGER PRIMARY KEY, name TEXT NOT NULL, updated_at DATETIME, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);`)
	}
	return (
		<Suspense fallback={<Text>Loading...</Text>}>
			<SQLiteProvider databaseName='example.db' onInit={createDbIfNone} useSuspense>
				<Stack>
					<Stack.Screen name='index' options={{ title: 'Home' }}></Stack.Screen>
					<Stack.Screen name='classes' options={{ title: 'classes', headerShown: false }}></Stack.Screen>
				</Stack>
			</SQLiteProvider>
		</Suspense>
	);
}
