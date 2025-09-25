import TestCard from '@/components/TestCard';
import { FlashCard } from '@/constants/Types';
import { cardQueries } from '@/db/queries/cardQueries';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';


export default function EditSet() {
	const { setId } = useLocalSearchParams<{ courseId: string, setId: string }>();
	const [cards, setCards] = useState<FlashCard[]>([])
	const [showResults, setShowResults] = useState(false);
	const [results, setResults] = useState<{ cardId: number, answer: string, isCorrect: boolean }[]>([]);

	const theme = useTheme();

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

	console.debug(results);
	const handleUpdateAnswer = useCallback((cardId, answer, isCorrect) => {
		setResults(res => {
			const index = res.findIndex(r => r.cardId === cardId);
			res[index] = { cardId, answer, isCorrect };
			return [...res];
		})

	}, []);

	return (
		<ScrollView style={{ paddingHorizontal: '10%' }} contentContainerStyle={{ justifyContent: 'center' }}>
			<Stack.Screen options={{ title: 'Testing', headerBackButtonMenuEnabled: true }} />

			{cards.map(card => <TestCard key={card.id} flashCard={card} showResult={showResults} updateAnswer={handleUpdateAnswer} />)}

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
	}
})