import { Globals } from '@/constants/BaseStyles';
import { useSQLiteContext } from 'expo-sqlite';
import { StyleSheet } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function CreateCard(props: { cardId: string, setId: string, removeCard: () => void }) {
	const db = useSQLiteContext();

	async function deleteCard() {
		try {
			await db.runAsync("DELETE FROM cards WHERE id = ?", props.cardId);
		} catch (err) {
			console.error("Error deleting card from set", err);
		}
	}

	return (
		<SafeAreaProvider>
			<Card>
				<Card.Title title='Create Card' />
				<Card.Content>
					<TextInput mode='outlined' multiline style={Globals.input} label='Term' />
					<TextInput mode='outlined' multiline style={Globals.input} label='Definition' />
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