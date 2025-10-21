import { cardQueries } from '@/db/queries/cardQueries';
import { classQueries } from '@/db/queries/classQueries';
import { setQueries } from '@/db/queries/setQueries';
import { Link, Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { ActivityIndicator, Button, MD2Colors, PaperProvider } from 'react-native-paper';

export const unstable_settings = {
	initialRouteName: 'index',
}

async function AddUnknownColumnMigration(db: SQLiteDatabase) {
	try {
		const columns = await db.getAllAsync(`PRAGMA table_info(cards);`);

		const hasUnknownColumn = columns.some((col) => col.name === "unknown");

		if (!hasUnknownColumn) {
			await db.execAsync(`ALTER TABLE cards ADD COLUMN unknown BOOLEAN DEFAULT FALSE;`);
		}
	} catch (err) {
		console.error('Error running migration', err);
	}
}

export default function RootLayout() {

	async function createDbIfNone(db: SQLiteDatabase) {
		console.log('Creating database');
		await classQueries.createTable();
		await setQueries.createTable();
		await cardQueries.createTable();

		await AddUnknownColumnMigration(db);
	}

	return (
		<PaperProvider theme={{ dark: false }}>
			<Suspense fallback={<ActivityIndicator animating color={MD2Colors.blue200} />}>
				<SQLiteProvider databaseName='study-app.db' onInit={createDbIfNone} useSuspense>
					<Stack
						screenOptions={{
							contentStyle: { backgroundColor: '#283444' },
							headerRight: (props) => <Link {...props} href={`/`}><Button icon='home'>Home</Button></Link>,
							animation: 'ios_from_right',
						}}>
						<Stack.Screen name='index' options={{ title: 'Home' }}></Stack.Screen>
						<Stack.Screen name='classes' options={{ title: 'Courses', headerBackButtonMenuEnabled: true }}></Stack.Screen>
						<Stack.Screen name='set/[setId]' options={{ headerShown: false }} />
					</Stack>
				</SQLiteProvider>
			</Suspense>
		</PaperProvider>
	);
}
