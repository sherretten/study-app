import CreateCard from '@/components/CreateCard';
import { FlashCard } from '@/constants/Types';
import { cardQueries } from '@/db/queries/cardQueries';
import { setQueries } from '@/db/queries/setQueries';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Portal, Text, TextInput, useTheme } from 'react-native-paper';


export default function CreateSet() {
	const { courseId } = useLocalSearchParams<{ courseId: string }>();
	const [setName, setSetName] = useState('');
	const [cards, setCards] = useState<FlashCard[]>([{ id: 1, term: '', definition: '' }])
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [importString, setImportString] = useState('');

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

	function handleSaveImport() {
		let newCards: FlashCard[] = [];

		const set = importString.split('\t');
		set.forEach((s) => {
			let termSplit = s.split(';');
			if (termSplit[0] && termSplit[1]) {
				newCards.push({ id: Date.now(), term: termSplit[1], definition: termSplit[0] });
			}
		})
	}

	async function handleSave() {
		try {
			setLoading(true);
			console.debug(setName);
			const newSetId = await setQueries.createSet({ name: setName, class_id: +courseId });
			await cardQueries.createCards(cards, newSetId);

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
		<ScrollView style={{ paddingHorizontal: '10%', }}>
			<Stack.Screen options={{ headerShown: true, title: 'Create Set', headerBackButtonMenuEnabled: true }} />
			<View style={{ marginTop: 16, gap: 5 }}>
				<View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
					<Text variant='titleLarge'>Create a new flashcard set</Text>
					<Button style={{ marginTop: 10, marginBottom: 10, backgroundColor: theme.colors.primary }}
						icon='plus'
						textColor='white'
						mode='contained'
						onPress={() => setModalOpen(true)}>
						Import
					</Button>
				</View>

				<Portal>
					<Modal
						style={{ marginHorizontal: '20%' }}
						visible={modalOpen}
						dismissable
						onDismiss={() => setModalOpen(false)}>
						<Card>
							<Card.Title title='Import Flash Cards'></Card.Title>
							<Card.Content>
								<TextInput placeholder={`Export your set with "Term and Definition" with tab, and "Between Rows" to Semicolon`}
									value={importString}
									multiline
									label='Import your data'
									onChangeText={(text) => setImportString(text)} />
							</Card.Content>
							<Card.Actions>
								<Button onPress={() => setModalOpen(false)}>Cancel</Button>
								<Button buttonColor={theme.colors.primary} textColor='white' onPress={handleSaveImport}>Save</Button>
							</Card.Actions>
						</Card>
					</Modal>
				</Portal>

				<Card>
					<Card.Content style={styles.cardContainer}>
						<TextInput label="Title" value={setName} onChangeText={text => setSetName(text)} />

						{cards.map((card, i) => <CreateCard key={card.id} card={card} index={i} updateCard={updateCard} removeCard={deleteCard} />)}

						<View style={styles.buttonContainer}>
							<Button
								buttonColor={theme.colors.primary}
								icon='plus'
								textColor='white'
								mode='outlined'
								onPress={addCard}>
								Add Card
							</Button>

							<Button
								mode='outlined'
								buttonColor={theme.colors.primary}
								textColor='white'
								disabled={!setName}
								onPress={handleSave}
								loading={loading}>
								Save
							</Button>
						</View>
					</Card.Content>
				</Card>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		gap: 10,
	},
	cardContainer: {
		gap: 10,
	}
})