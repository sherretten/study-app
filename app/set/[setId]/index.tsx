import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SetView() {
	const { id } = useLocalSearchParams();
	const [data, setData] = useState([]);

	const db = useSQLiteContext();

	const loadData = useCallback(async () => {
		const res = await db.getAllAsync("SELECT * FROM sets");
		setData(res);
	}, [db])

	useFocusEffect(
		useCallback(() => {
			loadData();
		}, [loadData])
	)

	return (
		<SafeAreaView>
			<Stack.Screen options={{ headerShown: false }} />
			<Text>This is the set page</Text>
			{/* Show list of flash cards */}
		</SafeAreaView>
	)
}