import TestCard from '@/components/TestCard';
import { FlashCard } from '@/constants/Types';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';


export default function EditSet() {
	const { setId } = useLocalSearchParams<{ courseId: string, setId: string }>();
	const [setName, setSetName] = useState('');
	const [cards, setCards] = useState<FlashCard[]>([])
	const [showResults, setShowResults] = useState(false);
	const [loading, setLoading] = useState(false);

	const theme = useTheme();
	const db = useSQLiteContext();


	useEffect(() => {
		const fetchCards = async () => {
			try {
				const cardsRes = await db.getAllAsync("SELECT * from cards where set_id = ?;", setId);
				const set = await db.getFirstAsync("SELECT * FROM sets WHERE id = ?;", setId);

				setSetName(set.name);
				setCards(cardsRes);
			} catch (err) {
				console.error(`Error fetching cards for set: ${setId}`, err);
			}
		};
		fetchCards();
	}, [db, setId])



	return (
		<ScrollView style={{ backgroundColor: theme.colors.background }}>
			<Stack.Screen options={{ title: 'Testing', headerBackButtonMenuEnabled: true }} />
			<TextInput label="Title" value={setName} onChangeText={text => setSetName(text)} />

			{cards.map(card => <TestCard key={card.id} flashCard={card} showResult={showResults} />)}

			<Button style={styles.button} mode='outlined'>Submit answers</Button>

		</ScrollView>
	)
}

const styles = StyleSheet.create({
	button: {
		width: 'auto',
		marginBottom: 10,
	}
})