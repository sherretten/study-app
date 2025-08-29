import { Link, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { SafeAreaView } from "react-native";
import { Button, useTheme } from "react-native-paper";

export default function Index() {
	const [data, setData] = useState([]);

	const theme = useTheme();
	const db = useSQLiteContext();

	const getData = useCallback(async () => {
		try {
			const result = await db.getAllAsync("SELECT * from class")
			setData(result);
		} catch (err) {
			console.error('error grabbing classes', err);
		}

	}, [db])

	useFocusEffect(
		useCallback(() => {
			getData();
		}, [getData])
	)

	//fetch classes here. 
	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: theme.colors.background,
			}}>
			{/* <FlatList data={data} renderItem={(item) => <Text>{item.name}</Text>}></FlatList> */}
			<Button mode='outlined'><Link href='/classes' style={{ color: theme.colors.primary }}>Classes</Link></Button>
		</SafeAreaView>
	);
}
