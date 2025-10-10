import TestCard from '@/components/TestCard';
import { cardQueries } from '@/db/queries/cardQueries';
import { Card } from '@/db/types';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Switch, Text, useTheme } from 'react-native-paper';


export default function TestSet() {
	const { setId } = useLocalSearchParams<{ courseId: string, setId: string }>();
	const [cards, setCards] = useState<Card[]>([])
	const [showResults, setShowResults] = useState(false);
	const [showOnlyFlagged, setFlagged] = useState(false);
	const [results, setResults] = useState<{ cardId: number, answer: string, isCorrect: boolean }[]>([]);

	const theme = useTheme();

	console.debug(cards);

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const cardsRes = await cardQueries.getCardsBySetId(+setId);

				setCards(cardsRes);
				setResults(cardsRes?.map(c => ({ cardId: c.id, answer: '', isCorrect: false })));
			} catch (err) {
				console.error(`Error fetching cards for set: ${setId}`, err);
			}
		};
		fetchCards();
	}, [setId])

	const handleUpdateAnswer = useCallback((cardId, answer, isCorrect) => {
		setResults(res => {
			const index = res.findIndex(r => r.cardId === cardId);
			res[index] = { cardId, answer, isCorrect };
			return [...res];
		})
	}, []);

	const shownCards = useMemo(() => {
		if (showOnlyFlagged) {
			return cards.filter(c => !!c.unknown);
		}

		return cards;
	}, [cards, showOnlyFlagged]);

	return (
		<ScrollView style={{ paddingHorizontal: '10%' }} contentContainerStyle={{ justifyContent: 'center' }}>
			<View style={styles.toggleContainer}>
				<Switch value={showOnlyFlagged} onValueChange={() => setFlagged(flag => !flag)}></Switch>
				<Text variant='titleLarge' style={{ color: 'white' }}>Show Flagged Only</Text>
			</View>
			<Stack.Screen options={{ title: 'Testing', headerBackButtonMenuEnabled: true }} />

			{shownCards.map(card => <TestCard key={card.id} flashCard={card} showResult={showResults} updateAnswer={handleUpdateAnswer} />)}

			<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
				<Button
					style={styles.button}
					buttonColor={theme.colors.primary}
					textColor='white'
					onPress={() => setShowResults(!showResults)}>
					{showResults ? 'Clear answers' : 'Submit answers'}
				</Button>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	button: {
		width: 'auto',
		marginBottom: 10,
	},
	toggleContainer: {
		flexDirection: 'row',
		gap: 2,
		color: 'white',
	}
})