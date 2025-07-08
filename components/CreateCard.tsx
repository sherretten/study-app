import { Button, StyleSheet, Text, TextInput, View } from 'react-native';


export default function CreateCard(props: { removeCard: () => void }) {

	return (
		<View>
			<Text>Create Card</Text>
			<View style={styles.container}>
				<TextInput style={styles.input} placeholder='Term'></TextInput>
				<TextInput style={styles.input} placeholder='Definition'></TextInput>
				<Button onPress={props.removeCard}>Delete Card</Button>
			</View>
		</View>
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