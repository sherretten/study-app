import CreateCard from '@/components/CreateCard';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { FlatList, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

export default function Index() {
	const [data, setData] = useState([]);

	const db = useSQLiteContext();


	useFocusEffect(
		useCallback(() => {
			getData();
		}, [getData])
	)

	async function getData() {
		const result = await db.getAllAsync("SELECT * from class")
		setData(result);
	}

	//fetch classes here. 
	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}>
			<CreateCard removeCard={() => null} />
			<FlatList data={data} renderItem={(item) => <Text>{item.name}</Text>}></FlatList>
		</SafeAreaView>
	);
}
