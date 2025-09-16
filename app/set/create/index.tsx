import CreateCard from '@/components/CreateCard';
import { FlashCard } from '@/constants/Types';
import { cardQueries } from '@/db/queries/cardQueries';
import { setQueries } from '@/db/queries/setQueries';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';


export default function CreateSet() {
	const { courseId } = useLocalSearchParams<{ courseId: string }>();
	const [setName, setSetName] = useState('');
	const [cards, setCards] = useState<FlashCard[]>([{ id: 1, term: '', definition: '' }])
	const [loading, setLoading] = useState(false);

	const theme = useTheme();
	const router = useRouter();

	function addCard() {
		setCards(cards => [...cards, { id: Date.now(), definition: '', term: '' }])
	}

	async function deleteCard(cardId: number) {
		setCards(cards => {
			const card = cards.filter(c => c.id !== cardId);
			return card;
		})
	}

	async function handleSave() {
		try {
			setLoading(true);
			console.debug(setName);
			const newSetId = await setQueries.createSet({ name: setName, class_id: +courseId });
			const sets = await setQueries.getSets();
			console.debug(sets);

			for (const card of cards) {
				await cardQueries.upsertCard(card);
			}

			//We want to route to the set view;
			router.push(`/set/${newSetId}`);
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