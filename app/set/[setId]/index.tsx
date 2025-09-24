import EditCardModal from '@/components/EditCardModal';
import FlashCard from '@/components/FlashCard';
import { cardQueries } from '@/db/queries/cardQueries';
import { setQueries } from '@/db/queries/setQueries';
import { Link, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SetView() {
	const { setId } = useLocalSearchParams<{ setId: string }>();
	const [data, setData] = useState();
	const [cards, setCards] = useState([]);
	const [viewingIndex, setIndex] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);

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
		<SafeAreaView style={{
			flex: 1,
			marginHorizontal: '10%',
			marginTop: '5%',
		}}>
			<View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', margin: 2 }}>
				<Text variant='displayLarge'>{data?.name}</Text>
				<Button buttonColor={theme.colors.primary} textColor='white' icon='edit' mode='outlined'>
					<Link href={`/set/${setId}/edit?courseId=${data?.class_id}`}>Edit Cards</Link>
				</Button>
			</View>

			<View style={{
				display: 'flex',
				flexDirection: 'row',
				gap: 2,
				flexWrap: 'wrap',
			}}>
				<Button buttonColor={theme.colors.primary} textColor='white' icon='test-tube' onPress={() => router.push(`/set/${setId}/test`)}>
					Test
				</Button>
				<Button buttonColor={theme.colors.primary} textColor='white' icon='test-tube' onPress={handleShuffle}>
					Shuffle
				</Button>
			</View>

			{cards.length > 0 ?
				<View style={{ display: 'flex', flexDirection: 'column' }}>
					<FlashCard flashCard={cards[viewingIndex]} />
					<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-evenly' }}>
						<Button
							buttonColor={theme.colors.primary}
							textColor='white'
							icon='arrow-left'
							onPress={() => setIndex(index => --index)}
							disabled={viewingIndex === 0}>
							Back
						</Button>
						<View style={{ alignItems: 'center' }}>
							<IconButton icon='edit' onPress={() => {
								setModalOpen(true);
							}} style={{ backgroundColor: theme.colors.secondary }}></IconButton>
							<Text>{viewingIndex + 1} / {cards.length}</Text>
						</View>
						<Button buttonColor={theme.colors.primary} textColor='white' icon='arrow-right' onPress={() => setIndex(index => ++index)} disabled={viewingIndex === cards.length - 1}>Next</Button>
					</View>
					<EditCardModal card={cards[viewingIndex]} onClose={handleClose} open={modalOpen} />
				</View>
				:
				<View>
					<Text style={{ textAlign: 'center' }} variant='titleLarge'>You have no cards for this set. Edit the set to add cards.</Text>
				</View>
			}

		</SafeAreaView>
	)
}
