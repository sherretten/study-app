import { Globals } from '@/constants/BaseStyles';
import { FlashCard } from '@/constants/Types';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

export default function CreateCard(props: { card: FlashCard, updateCard: (card: FlashCard) => void, removeCard: (id: number) => void }) {
	return (
		<View style={styles.container}>
			<View style={{ alignItems: "flex-end" }}>
				<IconButton mode='contained' icon='trash' style={{}} onPress={() => props.removeCard(props.card.id)}></IconButton>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<View style={{ flexBasis: '50%' }}>
					<TextInput mode='outlined' multiline style={Globals.input} label='Term' />
				</View>
				<View style={{ flexBasis: '50%' }}>
					<TextInput mode='outlined' multiline style={Globals.input} label='Definition' />
				</View>
			</View>
			<View>
			</View>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 10,
		borderRadius: 6,
		borderWidth: 3,
	},
});