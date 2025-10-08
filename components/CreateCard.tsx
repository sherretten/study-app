import { Globals } from '@/constants/BaseStyles';
import { FlashCard, TextInputSizeChangeEvent } from '@/constants/Types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, IconButton, Text, TextInput } from 'react-native-paper';


export default function CreateCard(props: { card: FlashCard, index: number, updateCard: (card: FlashCard) => void, removeCard: (id: number) => void, autoFocus?: boolean }) {
	const [termHeight, setTermHeight] = useState(50);
	const [definitionHeight, setDefHeight] = useState(50);
	const termRef = useRef(null);

	const handleChange = (field: string, value: string) => {
		props.updateCard({ ...props.card, [field]: value });
	}

	useEffect(() => {
		if (termRef.current && !props.card.term && props.autoFocus) {
			termRef.current.focus();
		}
		//Only want this to happen on first load.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleTermHeightChange = useCallback((e: TextInputSizeChangeEvent) => {
		setTermHeight(Math.max(50, e.nativeEvent.contentSize.height));
	}, []);
	const handleDefinitionHeightChange = useCallback((e: TextInputSizeChangeEvent) => {
		setDefHeight(Math.max(50, e.nativeEvent.contentSize.height));
	}, []);


	return (
		<Card style={styles.container}>
			<Card.Content>
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
							ref={termRef}
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
			</Card.Content>
		</Card>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 10,
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
