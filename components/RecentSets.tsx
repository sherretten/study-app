import { setQueries } from '@/db/queries/setQueries';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Icon, Text } from 'react-native-paper';


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
		<View style={styles.container}>
			<Text variant='displaySmall'>Recent Sets</Text>
			<View style={styles.setContainer}>
				{sets.map(set =>
					<Pressable style={{}} onPress={() => router.push(`/set/${set.id}`)} key={set.id}>
						<Card key={set.id}>
							<Card.Content style={styles.setContentContainer}>
								<Icon size={20} source='cards'></Icon>
								<Text>{set.name}</Text>
							</Card.Content>
						</Card>
					</Pressable>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 1,
	},
	setContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
	},
	setContentContainer: {
		flexDirection: 'row',
		gap: 4,
		alignItems: 'center',
	}
});