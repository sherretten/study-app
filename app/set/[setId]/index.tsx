import FlashCard from '@/components/FlashCard';
import { cardQueries } from '@/db/queries/cardQueries';
import { setQueries } from '@/db/queries/setQueries';
import { Link, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SetView() {
	const { setId } = useLocalSearchParams<{ setId: string }>();
	const [data, setData] = useState();
	const [cards, setCards] = useState([]);
	const [viewingIndex, setIndex] = useState(0);

	const theme = useTheme();

	const loadData = useCallback(async () => {
		const [cardRes, setRes] = await Promise.all([cardQueries.getCardsBySetId(+setId), setQueries.getSetById(+setId)]);

		setData(setRes);
		setCards(cardRes);
	}, [setId])

	useFocusEffect(
		useCallback(() => {
			loadData();
		}, [loadData])
	)

	return (
		<SafeAreaView style={{
			flex: 1,
			backgroundColor: theme.colors.background,
			padding: 10,
		}}>
			<View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
				<Text variant='displayLarge'>{data?.name}</Text>
				<Button buttonColor={theme.colors.primary} textColor='black' icon='edit' mode='outlined'>
					<Link href={`/set/${setId}/edit?courseId=${data?.class_id}`}>Edit Cards</Link>
				</Button>
			</View>

			<View style={{
				display: 'flex',
				flexWrap: 'wrap',
			}}>
				<Button buttonColor={theme.colors.primary} textColor='black' icon='test-tube'>
					<Link href={`/set/${setId}/test`}>Test</Link>
				</Button>
			</View>

			{cards.length > 0 &&
				<View style={{ display: 'flex', flexDirection: 'column' }}>
					<FlashCard flashCard={cards[viewingIndex]} />
					<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-evenly' }}>
						<Button buttonColor={theme.colors.primary} textColor='black' icon='arrow-left' onPress={() => setIndex(index => --index)} disabled={viewingIndex === 0}>Back</Button>
						<Text>{viewingIndex + 1} / {cards.length}</Text>
						<Button buttonColor={theme.colors.primary} textColor='black' icon='arrow-right' onPress={() => setIndex(index => ++index)} disabled={viewingIndex === cards.length - 1}>Next</Button>
					</View>
				</View>
			}
		</SafeAreaView>
	)
}