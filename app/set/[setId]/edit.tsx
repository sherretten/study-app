import CreateCard from '@/components/CreateCard';
import { FlashCard } from '@/constants/Types';
import { cardQueries } from '@/db/queries/cardQueries';
import { setQueries } from '@/db/queries/setQueries';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';


export default function EditSet() {
	const { courseId, setId } = useLocalSearchParams<{ courseId: string, setId: string }>();
	const [setName, setSetName] = useState('');
	const [cards, setCards] = useState<FlashCard[]>([])
	const [loading, setLoading] = useState(false);

	const theme = useTheme();
	const db = useSQLiteContext();
	const router = useRouter();

	function addCard() {
		setCards(cards => [...cards, { id: Date.now(), definition: '', term: '' }])
	}

	useEffect(() => {
		const fetchCards = async () => {
			const [cardsRes, set] = await Promise.all([cardQueries.getCardsBySetId(+setId), setQueries.getSetById(+setId)]);
			setSetName(set.name);

			if (cardsRes.length === 0) {
				addCard();
			} else {
				setCards(cardsRes);
			}
		};
		fetchCards();
	}, [db, setId])

	async function deleteCard(cardId: number) {
		try {
			await cardQueries.deleteCardById(cardId)
			setCards(cards => {
				const card = cards.filter(c => c.id !== cardId);
				return card;
			})
		} catch (err) {
			console.error("Error deleting card from set", err);
		}
	}

	async function handleSave() {
		try {
			setLoading(true);
			await db.runAsync("UPDATE sets SET name = ? WHERE id = ?;", setName, setId);

			await db.withTransactionAsync(async () => {
				for (const card of cards) {
					await db.runAsync(`
						INSERT INTO cards (id, term, definition, set_id) VALUES (?, ?, ?, ?) 
						ON CONFLICT(id) DO UPDATE SET term = excluded.term, definition = excluded.definition, set_id = excluded.set_id`,
						[card.id || null, card.term, card.definition, setId]);
				}
			})

			router.push(`/set/${setId}`);
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
			<Stack.Screen options={{ title: 'Edit Set', headerBackButtonMenuEnabled: true }} />
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