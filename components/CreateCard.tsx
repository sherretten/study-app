import { Globals } from '@/constants/BaseStyles';
import { StyleSheet } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function CreateCard(props: { removeCard: () => void }) {

	return (
		<SafeAreaProvider>
			<Card>
				<Card.Title title='Create Card' />
				<Card.Content>
					<TextInput mode='outlined' multiline style={Globals.input} placeholder='Term' />
					<TextInput mode='outlined' multiline style={Globals.input} placeholder='Definition' />
				</Card.Content>
				<Card.Actions>
					<Button onPress={props.removeCard}>Delete</Button>
				</Card.Actions>
			</Card>
		</SafeAreaProvider>
	)
}


const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		padding: 15,
		borderRadius: 6,
		borderWidth: 3,
	},
});