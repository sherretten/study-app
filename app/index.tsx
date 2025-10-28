import RecentSets from '@/components/RecentSets';
import { SafeAreaView, StyleSheet } from "react-native";
import { Text } from 'react-native-paper';
import Classes from './classes';

export default function Index() {

	return (
		<SafeAreaView style={styles.container}>
			<Text variant='displayLarge' style={{ color: 'white', textAlign: 'center' }}>Good luck on midterms 🥰</Text>
			<RecentSets />
			<Classes />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		marginHorizontal: '15%',
		gap: 10,
		flex: 1,
	},
})
