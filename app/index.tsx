import CreateCard from '@/components/CreateCard';
import { Link, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { SafeAreaView } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
	const [data, setData] = useState([]);

	const db = useSQLiteContext();

	const getData = useCallback(async () => {
		console.debug("how often is this getting ran?");
		const result = await db.getAllAsync("SELECT * from class")
		setData(result);
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
				// flex: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<CreateCard removeCard={() => null} />
			{/* <FlatList data={data} renderItem={(item) => <Text>{item.name}</Text>}></FlatList> */}
			<Button dark mode='outlined'><Link href='/classes' style={{ color: 'black' }}>Classes</Link></Button>
		</SafeAreaView>
	);
}
