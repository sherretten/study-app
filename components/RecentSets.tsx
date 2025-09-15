import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';


export default function RecentSets() {
	const [sets, setSets] = useState();

	const theme = useTheme();
	const db = useSQLiteContext();

	const fetchData = useCallback(async () => {
		try {
			const recentSets = await db.getAllAsync("SELECT * FROM sets ORDER BY updated_at DESC LIMIT 5");
			setSets(recentSets);
		} catch (err) {
			console.log("error fetching recent sets: ", err);
		}
	}, [db]);

	return (
		<View style={{}}>

		</View>
	)
}