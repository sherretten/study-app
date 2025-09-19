import { setQueries } from '@/db/queries/setQueries';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Card, Text } from 'react-native-paper';


export default function RecentSets() {
	const [sets, setSets] = useState([]);

	const router = useRouter();

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
		<View style={{ flex: 1, margin: 1 }}>
			<Text variant='bodyLarge'>Recent Sets</Text>
			<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
				{sets.map(set =>
					<Pressable style={{}} onPress={() => router.push(`/set/${set.id}`)} key={set.id}>
						<Card style={{ alignItems: 'center', }} key={set.id}>
							<Card.Title title={set.name} />
						</Card>
					</Pressable>
				)}
			</View>
		</View>
	)
}