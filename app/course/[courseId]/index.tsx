import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, useTheme } from 'react-native-paper';


export default function Course() {
	const [course, setCourse] = useState('');
	const [sets, setSets] = useState([]);
	const [showAdd, setShowAdd] = useState(false);

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
			<Button mode='outlined' style={{ backgroundColor: theme.colors.primary }}><Link href="">Create Set</Link></Button>


		</SafeAreaView>
	)
}