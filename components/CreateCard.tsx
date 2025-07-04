import { Button, Text, TextInput, View } from 'react-native';


export default function CreateCard(props: { removeCard: () => void }) {

	return (
		<View>
			<Text style={styles.container}>Create Card</Text>

			<TextInput placeholder='Term'></TextInput>
			<TextInput placeholder='Definition'></TextInput>
			<Button onPress={props.removeCard}>🗑️</Button>
		</View>
	)
}


const styles = StyleSheet.new({
	container: {
		flex: 1,
		border: '1px solid red',
	},
});