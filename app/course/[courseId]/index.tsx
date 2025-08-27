import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';


export default function Course() {
	const [course, setCourse] = useState('');
	const [sets, setSets] = useState([]);

	const { courseId } = useLocalSearchParams();
	const theme = useTheme();
	const db = useSQLiteContext();

	const fetchData = useCallback(async () => {
		try {
			const [className, sets] = await Promise.all([
				db.getFirstAsync("SELECT name FROM class WHERE id = ?", [courseId]),
				db.getAllAsync("SELECT * from sets WHERE class_id = ?", [courseId])
			]);

			setCourse(className.name);
			setSets(sets);
		} catch (err) {
			console.error("Error fetching class and set", err);
		}
	}, [db, courseId])

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

			{sets.map(set => <View key={set.id} style={{ margin: 2 }}>
				<Button mode='outlined' buttonColor={theme.colors.onPrimary}>
					<Link href={`/set/${set.id}`} style={{}}>
						{set.name} </Link></Button>
			</View>)}

		</SafeAreaView>
	)
}