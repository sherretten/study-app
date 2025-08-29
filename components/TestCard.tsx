import { FlashCard as Card } from '@/constants/Types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

export default function TestCard(props: { flashCard: Card, showResult: boolean }) {
	const [answer, setAnswer] = useState('');

	return (
		<View style={styles.container}>
			<Text variant='bodyLarge'>{props.flashCard.term}</Text>
			<TextInput onChangeText={(text) => setAnswer(text)} value={answer}></TextInput>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		height: 600,
		width: 300,
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 10,
		borderRadius: 6,
		borderWidth: 3,
	},
});