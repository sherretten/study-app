import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SetView() {
	const [data, setData] = useState([]);
	const db = useSQLiteContext();

	useFocusEffect(
		useCallback(() => {
			getData();
		}, [getData])
	)

	async function getData() {
		const result = await db.getAllAsync(`SELECT * FROM cards WHERE setId=${}`)
		setData(result);
	}

	return (
		<SafeAreaView>
			{/* Show list of flash cards */}
		</SafeAreaView>
	)
}