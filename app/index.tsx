import RecentSets from '@/components/RecentSets';
import { SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import Classes from './classes';

export default function Index() {
	const theme = useTheme();

	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: theme.colors.background,
			}}>
			<Classes />
			<RecentSets />
		</SafeAreaView>
	);
}
