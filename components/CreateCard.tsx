import { Globals } from '@/app/constants/BaseStyles';
import { Button, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function CreateCard(props: { removeCard: () => void }) {

	return (
		<SafeAreaProvider>
			<Text>Create Card</Text>
			<SafeAreaView style={styles.container}>
				<TextInput editable multiline style={Globals.input} placeholder='Term' />
				<TextInput editable multiline style={Globals.input} placeholder='Definition' />
				<Button onPress={props.removeCard} title='Delete Card' />
			</SafeAreaView>
		</SafeAreaProvider>
	)
}


const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		padding: 15,
		borderRadius: 6,
		borderColor: '#0f172b',
		borderWidth: 3,
	},
});