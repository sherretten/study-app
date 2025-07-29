import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SetView() {
	const { id } = useLocalSearchParams();
	const [data, setData] = useState([]);

	const db = useSQLiteContext();

	useFocusEffect(
		useCallback(async () => {
			const result = await db.getAllAsync(`SELECT * FROM cards WHERE setId=${id}`);
			setData(result);
		}, [db, id])
	)

	return (
		<SafeAreaView>
			{/* Show list of flash cards */}
		</SafeAreaView>
	)
}