import RecentSets from '@/components/RecentSets';
import { SafeAreaView, StyleSheet } from "react-native";
import { Card } from 'react-native-paper';
import Classes from './classes';

export default function Index() {

	return (
		<SafeAreaView style={styles.container}>
			<Card>
				<Card.Content>
					<RecentSets />
				</Card.Content>
			</Card>
			<Card>
				<Card.Content>
					<Classes />
				</Card.Content>
			</Card>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		marginHorizontal: '15%',
		gap: 10,
	},
})