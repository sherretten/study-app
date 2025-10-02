import CreateCard from '@/components/CreateCard';
import { FlashCard } from '@/constants/Types';
import { cardQueries } from '@/db/queries/cardQueries';
import { setQueries } from '@/db/queries/setQueries';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';


export default function EditSet() {
	const { courseId, setId } = useLocalSearchParams<{ courseId: string, setId: string }>();
	const [setName, setSetName] = useState('');
	const [cards, setCards] = useState<FlashCard[]>([])
	const [loading, setLoading] = useState(false);
	const scrollViewRef = useRef<ScrollView>(null);

	const db = useSQLiteContext();
	const router = useRouter();

	const handleScrollToBottom = useCallback(() => {
		scrollViewRef.current?.scrollToEnd({ animated: true });
	}, []);

	const addCard = useCallback(() => {
		setCards(cards => [...cards, { id: Date.now(), definition: '', term: '', setId }])
		handleScrollToBottom();
	}, [handleScrollToBottom, setId]);

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
	}, [addCard, db, setId])

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
			await setQueries.updateSet(setName, +setId);
			await cardQueries.upsertCards(cards, +setId);

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
		<ScrollView style={styles.container} ref={scrollViewRef} onContentSizeChange={handleScrollToBottom}>
			<Card>
				<Card.Content style={styles.cardContainer}>
					<View style={styles.headerContainer}>
						<TextInput label="Title" value={setName} onChangeText={text => setSetName(text)} style={{ margin: 2, flex: 1 }} />
						<Button mode='outlined' onPress={addCard}>Add Card</Button>

					</View>

					{cards.map((card, i) => <CreateCard key={card.id} card={card} updateCard={updateCard} removeCard={deleteCard} index={i} />)}

					<View style={styles.buttonContainer}>
						<Button mode='outlined' onPress={addCard}>Add Card</Button>

						<Button mode='outlined' disabled={!setName} onPress={handleSave} loading={loading}>Save</Button>
					</View>

				</Card.Content>
			</Card>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: '15%' //Using padding horizontal here since the scrollbar would be close to it with margin.
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		gap: 10,
		marginTop: 10,
	},
	cardContainer: {
		gap: 10,
	},
	headerContainer: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center'
	},
})