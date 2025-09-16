import { setQueries } from '@/db/queries/setQueries';
import { Link } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';


export default function RecentSets() {
	const [sets, setSets] = useState([]);

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

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<View style={{}}>
			{sets.map(set =>
				<View key={set.id} style={{ margin: 2 }}>
					<Button mode='outlined' buttonColor={theme.colors.onPrimary}>
						<Link href={`/set/${set.id}`} style={{}}>
							{set.name}
						</Link>
					</Button>
				</View>
			)}
		</View>
	)
}