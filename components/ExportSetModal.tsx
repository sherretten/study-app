import { Card } from '@/db/types';
import { View } from 'react-native';
import { Modal, Portal, Text, TextInput, useTheme } from 'react-native-paper';

export default function ExportSetModal(props: { cards: Card[], open: boolean, onClose: () => void }) {
	const theme = useTheme();

	const cardString = props.cards.map(c => `${c.term}\n${c.definition}`).join(';');
	return (
		<Portal>
			<Modal visible={props.open} onDismiss={props.onClose} dismissable style={{ marginHorizontal: '20%' }}>
				<View style={{ padding: 20, backgroundColor: theme.colors.background, gap: 5 }}>
					<Text style={{ textAlign: 'center' }} variant='headlineLarge'>Export Cards</Text>
					<TextInput multiline value={cardString} label='Term'></TextInput>
				</View>
			</Modal>
		</Portal>
	)
}