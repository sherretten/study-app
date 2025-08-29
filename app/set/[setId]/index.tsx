import FlashCard from '@/components/FlashCard';
import { Link, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SetView() {
	const { setId } = useLocalSearchParams<{ setId: string }>();
	const [data, setData] = useState();
	const [cards, setCards] = useState([]);
	const [viewingIndex, setIndex] = useState(0);

	const db = useSQLiteContext();
	const theme = useTheme();

	const loadData = useCallback(async () => {
		try {
			const setRes = await db.getFirstAsync("SELECT * FROM sets WHERE id = ?", [setId]);
			console.debug(setRes)
			const cardRes = await db.getAllAsync("SELECT * FROM cards WHERE set_id = ?", [setId])
			console.debug(cardRes)
			setData(setRes);
			setCards(cardRes);
		} catch (err) {
			console.error("Error fetching set:", err);
		}
	}, [db, setId])

	useFocusEffect(
		useCallback(() => {
			loadData();
		}, [loadData])
	)

	return (
		<SafeAreaView style={{
			flex: 1,
			justifyContent: "center",
			alignItems: 'center',
			backgroundColor: theme.colors.background,
		}}>
			<Stack.Screen options={{ headerShown: true, headerBackButtonMenuEnabled: true }} />
			<Text variant='displayLarge'>{data?.name}</Text>

			<Button buttonColor={theme.colors.onPrimary} mode='outlined'><Link href={`/set/${setId}/edit?courseId=${data?.class_id}`}>Edit Cards</Link></Button>

			<View style={{
				display: 'flex',
				flexWrap: 'wrap',
			}}>
				{/* I think we want a new route for this? */}
				<Button style={{ padding: 10, borderColor: theme.colors.primary }}><Link href={`/set/${setId}/test`}>Test</Link></Button>
			</View>

			{cards.length > 0 &&
				<View style={{ display: 'flex', flexDirection: 'column' }}>
					<FlashCard flashCard={cards[viewingIndex]} />
					<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-evenly' }}>
						<IconButton icon='arrow-left' onPress={() => setIndex(index => --index)} disabled={viewingIndex === 0}></IconButton>
						<Text>{viewingIndex + 1} / {cards.length}</Text>
						<IconButton icon='arrow-right' onPress={() => setIndex(index => ++index)} disabled={viewingIndex === cards.length - 1}></IconButton>
					</View>
				</View>
			}
		</SafeAreaView>
	)
}