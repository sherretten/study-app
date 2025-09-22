import { cardQueries } from '@/db/queries/cardQueries';
import { Card } from '@/db/types';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, Modal, Portal, Text, TextInput, useTheme } from 'react-native-paper';



export default function EditCardModal(props: { open: boolean, onClose: () => void, card: Card }) {
	const [term, setTerm] = useState(props.card.term)
	const [definition, setDefinition] = useState(props.card.definition);

	const theme = useTheme();


	const handleSave = useCallback(async () => {
		try {
			await cardQueries.upsertCards([{ ...props.card, term, definition }], props.card.set_id);

			props.onClose();
		} catch (err) {

		}
	}, [definition, props, term]);

	return (
		<Portal>
			<Modal visible={props.open} onDismiss={props.onClose} dismissable style={{ marginHorizontal: '20%' }}>
				<View style={{ padding: 20, backgroundColor: theme.colors.background, gap: 5 }}>
					<Text style={{ textAlign: 'center' }} variant='headlineLarge'>Edit Card</Text>
					<TextInput multiline value={term} onChangeText={(t) => setTerm(t)} label='Term'></TextInput>
					<TextInput multiline value={definition} onChangeText={(t) => setDefinition(t)} label='Definition'></TextInput>

					<Button buttonColor={theme.colors.primary} textColor='white' mode='contained' onPress={handleSave}>Update Card</Button>
				</View>
			</Modal>
		</Portal>
	)
}