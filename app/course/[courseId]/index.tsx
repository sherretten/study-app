import { classQueries } from '@/db/queries/classQueries';
import { setQueries } from '@/db/queries/setQueries';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import { Button, Card, useTheme } from 'react-native-paper';


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
		<SafeAreaView style={{
			flex: 1,
		}}>
			<Stack.Screen options={{ headerShown: true, title: course }} />
			<Button mode='contained' buttonColor={theme.colors.primary} textColor='white' onPress={() => router.push(`/set/create?courseId=${courseId}`)}>
				Create Set
			</Button>

			<View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
				{sets.map(set =>
					<Pressable style={{ flexBasis: '48%' }} onPress={() => router.push(`/set/${set.id}`)} key={set.id}>
						<Card style={{ alignItems: 'center', }} key={set.id}>
							<Card.Title title={set.name} />
						</Card>
					</Pressable>
				)}
			</View>
		</SafeAreaView>
	)
}