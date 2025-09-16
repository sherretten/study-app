import { cardQueries } from '@/db/queries/cardQueries';
import { classQueries } from '@/db/queries/classQueries';
import { setQueries } from '@/db/queries/setQueries';
import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { ActivityIndicator, MD2Colors, PaperProvider } from 'react-native-paper';

export default function RootLayout() {

	async function createDbIfNone() {
		console.log('Creating database');
		await classQueries.createTable();
		await setQueries.createTable();
		await cardQueries.createTable();
	}

	return (
		<PaperProvider>
			<Suspense fallback={<ActivityIndicator animating color={MD2Colors.blue200} />}>
				<SQLiteProvider databaseName='example.db' onInit={createDbIfNone} useSuspense>
					<Stack>
						<Stack.Screen name='index' options={{ title: 'Home' }}></Stack.Screen>
						<Stack.Screen name='classes' options={{ title: 'Courses', headerBackButtonMenuEnabled: true }}></Stack.Screen>
					</Stack>
				</SQLiteProvider>
			</Suspense>
		</PaperProvider>
	);
}
