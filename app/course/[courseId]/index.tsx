import { classQueries } from '@/db/queries/classQueries';
import { setQueries } from '@/db/queries/setQueries';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, Text, useTheme } from 'react-native-paper';


export default function Course() {
	const [course, setCourse] = useState('');
	const [sets, setSets] = useState([]);

	const { courseId } = useLocalSearchParams<{ courseId: string }>();
	const theme = useTheme();
	const router = useRouter();

	const fetchData = useCallback(async () => {
		const [course, sets] = await Promise.all([
			classQueries.getClassById(+courseId),
			setQueries.getSetsByClassId(+courseId),
		]);

		if (course === null || sets === null) {
			router.back();
			return;
		}

		setCourse(course?.name);
		setSets(sets);
	}, [courseId, router])

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen options={{ headerShown: true, title: course }} />
			<Card>
				<Card.Content>
					<View style={styles.topRow}>
						<Button icon='plus' buttonColor={theme.colors.primary} textColor='white' onPress={() => router.push(`/set/create?courseId=${courseId}`)}>
							Create Set
						</Button>
					</View>

					<View style={styles.setContainer}>
						{sets.map(set =>
							<Pressable onPress={() => router.push(`/set/${set.id}`)} key={set.id}>
								<Card key={set.id}>
									<Card.Content style={styles.setContentContainer}>
										<Icon size={20} source='cards'></Icon>
										<Text>{set.name}</Text>
									</Card.Content>
								</Card>
							</Pressable>
						)}
					</View>
				</Card.Content>
			</Card>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: '15%',
		marginTop: '5%',
		gap: 5,
	},
	topRow: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 5
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