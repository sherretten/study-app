import { classQueries } from '@/db/queries/classQueries';
import { setQueries } from '@/db/queries/setQueries';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';


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
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: theme.colors.background,
		}}>
			<Stack.Screen options={{ headerShown: true, title: course }} />
			<Button mode='contained' style={{ backgroundColor: theme.colors.primary }}>
				<Link style={{ color: 'black' }} href={`/set/create?courseId=${courseId}`}>Create Set</Link>
			</Button>

			{sets.map(set =>
				<View key={set.id} style={{ margin: 2 }}>
					<Button mode='outlined' buttonColor={theme.colors.onPrimary}>
						<Link href={`/set/${set.id}`} style={{}}>
							{set.name}
						</Link>
					</Button>
				</View>
			)}

		</SafeAreaView>
	)
}