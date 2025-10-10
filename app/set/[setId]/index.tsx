import EditCardModal from '@/components/EditCardModal';
import ExportSetModal from '@/components/ExportSetModal';
import FlashCard from '@/components/FlashCard';
import { cardQueries } from '@/db/queries/cardQueries';
import { setQueries } from '@/db/queries/setQueries';
import { Link, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SetView() {
	const { setId } = useLocalSearchParams<{ setId: string }>();
	const [set, setData] = useState();
	const [cards, setCards] = useState([]);
	const [viewingIndex, setIndex] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);
	const [exportModalOpen, setExportModalOpen] = useState(false);

	console.debug(cards);
	const theme = useTheme();
	const router = useRouter();

	const loadData = useCallback(async () => {
		const [cardRes, setRes] = await Promise.all([cardQueries.getCardsBySetId(+setId), setQueries.getSetById(+setId)]);

		setData(setRes);
		setCards(cardRes);
	}, [setId])

	const handleClose = useCallback(() => {
		loadData();
		setModalOpen(false);
	}, [loadData])

	const handleShuffle = useCallback(() => {
		let cardsCopy = [...cards];
		for (let i = 0; i < cards.length; i++) {
			let j = Math.floor(Math.random() * (i + 1));
			[cardsCopy[i], cardsCopy[j]] = [cardsCopy[j], cardsCopy[i]];
		}

		console.debug(cardsCopy);
		setCards(cardsCopy);
		setIndex(0);
	}, [cards]);


	useFocusEffect(
		useCallback(() => {
			loadData();
		}, [loadData])
	)

	return (
		<SafeAreaView style={styles.container}>
			<Card>
				<Card.Content>
					<View style={styles.topBarContainer}>
						<Text variant='displayMedium' style={{ maxWidth: '90%' }}>{set?.name}</Text>
					</View>

					<View style={styles.cardActions}>
						<Button buttonColor={theme.colors.primary} textColor='white' icon='test-tube' onPress={() => router.push(`/set/${setId}/test`)}>
							Test
						</Button>
						<Button buttonColor={theme.colors.primary} textColor='white' icon='refresh' onPress={handleShuffle}>
							Shuffle
						</Button>
						<Button buttonColor={theme.colors.primary} textColor='white' icon='export' onPress={() => setExportModalOpen(true)}>Export</Button>
						<Button buttonColor={theme.colors.primary} textColor='white' icon='pencil' mode='outlined'>
							<Link href={`/set/${setId}/edit?courseId=${set?.class_id}`}>Edit Cards</Link>
						</Button>
					</View>

					<ExportSetModal cards={cards} open={exportModalOpen} onClose={() => setExportModalOpen(false)} />

					{cards.length > 0 ?
						<View style={styles.flashCardContainer}>
							<FlashCard flashCard={cards[viewingIndex]} />
							<View style={styles.buttonContainer}>
								<Button
									buttonColor={theme.colors.primary}
									textColor='white'
									icon='arrow-left'
									onPress={() => setIndex(index => --index)}
									disabled={viewingIndex === 0}>
									Back
								</Button>
								<View style={{ alignItems: 'center' }}>
									<IconButton
										icon='pencil'
										onPress={() => setModalOpen(true)}
										style={{ backgroundColor: theme.colors.secondary }}></IconButton>
									<Text>{viewingIndex + 1} / {cards.length}</Text>
								</View>
								<Button buttonColor={theme.colors.primary}
									textColor='white'
									icon='arrow-right'
									onPress={() => setIndex(index => ++index)}
									disabled={viewingIndex === cards.length - 1}
									contentStyle={{ flexDirection: 'row-reverse' }}>Next</Button>
							</View>
							<EditCardModal card={cards[viewingIndex]} onClose={handleClose} open={modalOpen} />
						</View>
						:
						<View>
							<Text style={{ textAlign: 'center' }} variant='titleLarge'>You have no cards for this set. Edit the set to add cards.</Text>
						</View>
					}
				</Card.Content>
			</Card>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: '15%',
		marginTop: '5%',
	},
	topBarContainer: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		margin: 2,
	},
	cardActions: {
		flexDirection: 'row',
		gap: 2,
		flexWrap: 'wrap',
	},
	flashCardContainer: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: 5,
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'baseline',
		justifyContent: 'space-evenly',
		marginBottom: 5,
		// maxWidth: 600,
	},
})