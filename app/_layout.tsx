import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { ActivityIndicator, MD2Colors, PaperProvider } from 'react-native-paper';

export default function RootLayout() {
	async function createDbIfNone(db: SQLiteDatabase) {
		console.log('Creating database');
		await db.execAsync(`CREATE TABLE IF NOT EXISTS "class" (id INTEGER PRIMARY KEY, name TEXT NOT NULL, updated_at DATETIME, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);`)
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
