import { setQueries } from '@/db/queries/setQueries';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
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
		<Card style={styles.container}>
			<Card.Title title={<Text variant='displaySmall'>Recent Sets</Text>} />
			<Card.Content style={styles.setContainer}>
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
			</Card.Content>
		</Card>
	)
}

const styles = StyleSheet.create({
	container: {
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
