import { Globals } from '@/constants/BaseStyles';
import { TextInputSizeChangeEvent } from '@/constants/Types';
import { cardQueries } from '@/db/queries/cardQueries';
import { Card as FlashCard } from '@/db/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, TextInput, useTheme } from 'react-native-paper';

const normalize = (str: string) => str.toLocaleLowerCase().trim().replace(/[^\w\s]/g, '');

function cosineSimilarity(str1: string, str2: string) {
	const getWordFreq = (str) => {
		const words = str.toLowerCase().split(/\s+/);
		const freq = {};
		words.forEach(word => freq[word] = (freq[word] || 0) + 1);
		return freq;
	};

	const freq1 = getWordFreq(str1);
	const freq2 = getWordFreq(str2);

	const allWords = new Set([...Object.keys(freq1), ...Object.keys(freq2)]);

	let dotProduct = 0;
	let magnitude1 = 0;
	let magnitude2 = 0;

	allWords.forEach(word => {
		const f1 = freq1[word] || 0;
		const f2 = freq2[word] || 0;

		dotProduct += f1 * f2;
		magnitude1 += f1 * f1;
		magnitude2 += f2 * f2;
	});

	return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2)) || 0;
}

export default function TestCard(props: { flashCard: FlashCard, showResult: boolean, updateAnswer: (cardId, answer, isCorrect) => void }) {
	const [answer, setAnswer] = useState('');
	const [termHeight, setTermHeight] = useState(50);
	const [showAnswer, setShowAnswer] = useState(false);
	const [flagged, setFlagged] = useState(props.flashCard.unknown);

	const theme = useTheme();

	const isCorrect = useMemo(() => {
		if (!answer) {
			return false;
		}
		const normalizedAnswer = normalize(props.flashCard.definition);
		const normalizedInput = normalize(answer);

		const similarity = cosineSimilarity(normalizedAnswer, normalizedInput);

		return similarity > .75;

	}, [answer, props.flashCard.definition]);

	useEffect(() => {
		props.updateAnswer(props.flashCard.id, answer, isCorrect);
	}, [answer, isCorrect, props.flashCard.id])

	const handleTermHeightChange = useCallback((e: TextInputSizeChangeEvent) => {
		setTermHeight(Math.max(50, e.nativeEvent.contentSize.height));
	}, []);

	const handleFlagging = useCallback(async () => {
		await cardQueries.upsertCards([{ ...props.flashCard, unknown: !flagged }], props.flashCard.set_id);
		setFlagged(flagged => !flagged);
	}, [flagged, props.flashCard]);

	return (
		<Card style={styles.container}>
			<Card.Title
				title={
					<View style={styles.topBar}>
						<Text variant='displaySmall'>{props.flashCard.term}</Text>
						<IconButton mode='contained' icon={flagged ? 'flag-variant' : 'flag-variant-outline'} onPress={handleFlagging}></IconButton>
					</View>} />
			<Card.Content>
				{props.showResult ?
					<Text style={{ color: isCorrect ? 'green' : 'red' }} variant='headlineSmall'>{answer || 'No answer provided'}</Text>
					:
					<TextInput style={[Globals.input, { minHeight: termHeight }]} multiline onChangeText={(text) => setAnswer(text)} value={answer} onContentSizeChange={handleTermHeightChange}></TextInput>
				}

				{(showAnswer || (props.showResult && !isCorrect)) &&
					<View>
						<Text variant='headlineMedium'>Correct Answer:</Text>
						<Text variant='headlineSmall' style={{ color: 'green' }}>{props.flashCard.definition}</Text>
					</View>
				}

				{!props.showResult &&
					<View style={{ alignSelf: 'flex-end' }}>
						<Button style={{ marginTop: 5, }}
							buttonColor={theme.colors.primary}
							textColor='white'
							onPress={() => setShowAnswer(!showAnswer)}>
							{showAnswer ? 'Hide' : 'Show'} answer
						</Button>
					</View>
				}
			</Card.Content>
		</Card>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		minHeight: 200,
		minWidth: 300,
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 10,
		marginVertical: '1%',
	},
	topBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'flex-start',
		width: '95%',
	}
});