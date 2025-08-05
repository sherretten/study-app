import FlashCard from '@/components/FlashCard';
import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SetView() {
	const { id } = useLocalSearchParams();
	const [data, setData] = useState();
	const [cards, setCards] = useState([]);
	const [viewingIndex, setIndex] = useState(0);

	const db = useSQLiteContext();

	const loadData = useCallback(async () => {
		try {
			const setRes = await db.getFirstAsync("SELECT * FROM sets WHERE id = ?", [id]);
			const cardsRes = await db.getAllAsync("SELECT * FROM cards WHERE set_id = ?", [id])
			setData(setRes);
			setCards(cardRes);
		} catch (err) {
			console.error("Error fetching set: ", err);
		}
	}, [db, id])

	useFocusEffect(
		useCallback(() => {
			loadData();
		}, [loadData])
	)

	return (
		<SafeAreaView>
			<Stack.Screen options={{ headerShown: false }} />
			<Text variant='displayLarge'>{data?.name}</Text>

			<View style={{
				display: 'flex',
				flexWrap: 'wrap',
			}}>
				{/* I think we want a new route for this? */}
				<Button onPress={() => null}>Test</Button>
				<Button onPress={() => null}>Flash Card</Button>
			</View>


			<FlashCard flashCard={cards[viewingIndex]} />
			<IconButton icon='arrow-left' onPress={() => setIndex(index => --index)} disabled={viewingIndex === 0}></IconButton>
			<Text>{viewingIndex + 1} / {cards.length}</Text>
			<IconButton icon='arrow-right' onPress={() => setIndex(index => ++index)} disabled={viewingIndex === cards.length - 1}></IconButton>
		</SafeAreaView>
	)
}