import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// This needs to show all the sets for the class.
export default function CourseBase() {

	const searchParams = useLocalSearchParams();
	const db = useSQLiteContext();

	console.debug(searchParams);

	return (
		<SafeAreaView>
			<Stack.Screen options={{ headerShown: false, title: "Course View" }} />
			<Text>Hi</Text>

			<Button mode='outlined'><Link href='/' style={{ color: 'black' }}>Home</Link></Button>
		</SafeAreaView>
	)
}