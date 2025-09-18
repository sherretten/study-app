import TestCard from '@/components/TestCard';
import { FlashCard } from '@/constants/Types';
import { cardQueries } from '@/db/queries/cardQueries';
import { setQueries } from '@/db/queries/setQueries';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';


export default function EditSet() {
	const { setId } = useLocalSearchParams<{ courseId: string, setId: string }>();
	const [setName, setSetName] = useState('');
	const [cards, setCards] = useState<FlashCard[]>([])
	const [showResults, setShowResults] = useState(false);
	const [loading, setLoading] = useState(false);

	const theme = useTheme();

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const [cardsRes, set] = await Promise.all([cardQueries.getCardsBySetId(+setId), setQueries.getSetById(+setId)]);

				setSetName(set.name);
				setCards(cardsRes);
			} catch (err) {
				console.error(`Error fetching cards for set: ${setId}`, err);
			}
		};
		fetchCards();
	}, [setId])



	return (
		<ScrollView style={{ paddingHorizontal: '10%', }}>
			<Stack.Screen options={{ title: 'Testing', headerBackButtonMenuEnabled: true }} />
			<Text variant='titleLarge'>Title</Text>

			{cards.map(card => <TestCard key={card.id} flashCard={card} showResult={showResults} />)}

			<Button style={styles.button} mode='outlined'>Submit answers</Button>

		</ScrollView>
	)
}

const styles = StyleSheet.create({
	button: {
		width: 'auto',
		marginBottom: 10,
	}
})