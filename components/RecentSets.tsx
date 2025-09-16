import { setQueries } from '@/db/queries/setQueries';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';


export default function RecentSets() {
	const [sets, setSets] = useState();

	const theme = useTheme();

	const fetchData = useCallback(async () => {
		try {
			const recentSets = await setQueries.getRecentlyUpdatedSets();
			if (recentSets !== null) {
				setSets(recentSets);
			}
		} catch (err) {
			console.log("error fetching recent sets: ", err);
		}
	}, []);

	return (
		<View style={{}}>

		</View>
	)
}