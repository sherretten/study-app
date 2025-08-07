import CreateCard from '@/components/CreateCard';
import { FlashCard } from '@/constants/Types';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';


export default function CreateSet() {
	const { courseId } = useLocalSearchParams<{ courseId: string }>();
	const [setName, setSetName] = useState('');
	const [cards, setCards] = useState<FlashCard[]>([{ id: 1, term: '', definition: '' }])
	const [loading, setLoading] = useState(false);

	const theme = useTheme();
	const db = useSQLiteContext();
	const router = useRouter();

	function addCard() {
		setCards(cards => [...cards, { id: Date.now(), definition: '', term: '' }])
	}

	async function deleteCard(cardId: number) {
		// try {
		// 	await db.runAsync("DELETE FROM cards WHERE id = ?", cardId);
		// } catch (err) {
		// 	console.error("Error deleting card from set", err);
		// }

		setCards(cards => {
			const card = cards.filter(c => c.id !== cardId);
			return card;
		})
	}

	async function handleSave() {
		try {
			setLoading(true);
			console.debug(setName);
			// const setRes = await db.runAsync("INSERT INTO sets (name, class_id) VALUES (?, ?);", setName, courseId);
			const setRes = { lastInsertRowId: 3 };
			const sets = await db.getAllAsync("SELECT * from sets;");
			console.debug(sets);

			await db.withTransactionAsync(async () => {
				for (const card of cards) {
					await db.runAsync(`INSERT INTO cards (term, definition, set_id) VALUES (?, ?, ?)`, [card.term, card.definition, setRes.lastInsertRowId]);
				}
			})
			const cardsRest = await db.getAllAsync("SELECT * from cards where set_id = ?;", setRes.lastInsertRowId);

			console.debug(cardsRest);
			//We want to route to the set view;
			router.push(`/set/${setRes.lastInsertRowId}`);
		} catch (err) {
			console.error("Error creating set or cards", err)
		} finally {
			setLoading(false);
		}
	}

	function updateCard(updatedCard: FlashCard) {
		setCards(cards => {
			const cardIndex = cards.findIndex(card => card.id === updatedCard.id);
			cards[cardIndex] = updatedCard;
			return [...cards];
		})
	}


	return (
		<ScrollView style={{ backgroundColor: theme.colors.background }}>
			<Stack.Screen options={{ headerShown: true, title: 'Create Set', headerBackButtonMenuEnabled: true }} />
			<TextInput label="Title" value={setName} onChangeText={text => setSetName(text)} />

			{cards.map(card => <CreateCard key={card.id} card={card} updateCard={updateCard} removeCard={deleteCard} />)}

			<Button style={styles.button} mode='outlined' onPress={addCard}>Add Card</Button>

			<Button mode='outlined' disabled={!setName} onPress={handleSave} loading={loading}>Save</Button>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	button: {
		width: 'auto',
		marginBottom: 10,
	}
})