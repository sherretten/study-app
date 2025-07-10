import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';



export default function FlashCard(props: { flashCard }) {
	const [showAnswer, setShowAnswer] = useState(false)
	return (
		<TouchableOpacity onPress={() => setShowAnswer(answer => !answer)}>
			<Text>{showAnswer && props.flashCard.answer}</Text>
			<Text>{!showAnswer && props.flashCard.key} </Text>
		</TouchableOpacity>
	)
}


const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		gap: 2,
		padding: 15,
		// flex: 1,
		borderRadius: 6,
		borderColor: '#0f172b',
		borderWidth: 3,
	},
	inputContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	input: {
		padding: 5,
		borderRadius: 6,
		borderColor: '#0f172b',
		borderWidth: 2,
	}
});