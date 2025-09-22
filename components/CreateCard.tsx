import { Globals } from '@/constants/BaseStyles';
import { FlashCard } from '@/constants/Types';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';

export default function CreateCard(props: { card: FlashCard, index: number, updateCard: (card: FlashCard) => void, removeCard: (id: number) => void }) {

	const handleChange = (field: string, value: string) => {
		props.updateCard({ ...props.card, [field]: value });
	}

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Text variant='headlineMedium'>{props.index}</Text>
				<IconButton mode='contained' icon='trash' onPress={() => props.removeCard(props.card.id)}></IconButton>
			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<View style={{ flexBasis: '49%' }}>
					<TextInput multiline style={Globals.input} label='Term' value={props.card.term} onChangeText={(text) => handleChange('term', text)} />
				</View>
				<View style={{ flexBasis: '49%' }}>
					<TextInput multiline style={Globals.input} label='Definition' value={props.card.definition} onChangeText={(text) => handleChange('definition', text)} />
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
		borderWidth: 1,
		marginBottom: 2,
	},
});
