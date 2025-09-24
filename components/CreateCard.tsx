import { Globals } from '@/constants/BaseStyles';
import { FlashCard, TextInputSizeChangeEvent } from '@/constants/Types';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';


export default function CreateCard(props: { card: FlashCard, index: number, updateCard: (card: FlashCard) => void, removeCard: (id: number) => void }) {
	const [termHeight, setTermHeight] = useState(50);
	const [definitionHeight, setDefHeight] = useState(50);

	const handleChange = (field: string, value: string) => {
		props.updateCard({ ...props.card, [field]: value });
	}

	const handleTermHeightChange = useCallback((e: TextInputSizeChangeEvent) => {
		setTermHeight(Math.max(50, e.nativeEvent.contentSize.height));
	}, []);
	const handleDefinitionHeightChange = useCallback((e: TextInputSizeChangeEvent) => {
		setDefHeight(Math.max(50, e.nativeEvent.contentSize.height));
	}, []);


	return (
		<View style={styles.container}>
			<View style={styles.topBar}>
				<Text variant='headlineMedium'>{props.index}</Text>
				<IconButton mode='contained' icon='trash-can' onPress={() => props.removeCard(props.card.id)}></IconButton>
			</View>
			<View style={styles.topBar}>
				<View style={styles.textInput}>
					<TextInput
						multiline
						style={[Globals.input, { height: termHeight }]}
						label='Term'
						value={props.card.term}
						onContentSizeChange={handleTermHeightChange}
						onChangeText={(text) => handleChange('term', text)} />
				</View>
				<View style={styles.textInput}>
					<TextInput
						multiline
						onContentSizeChange={handleDefinitionHeightChange}
						style={[Globals.input, { height: definitionHeight }]}
						label='Definition'
						value={props.card.definition}
						onChangeText={(text) => handleChange('definition', text)} />
				</View>
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
	topBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		gap: 10
	},
	textInput: {
		minWidth: 200,
		flexGrow: 1,
	},
});
