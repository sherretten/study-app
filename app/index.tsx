import RecentSets from '@/components/RecentSets';
import { SafeAreaView } from "react-native";
import Classes from './classes';

export default function Index() {

	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: 'center',
				paddingHorizontal: '10%',
			}}>
			<Classes />
			<RecentSets />
		</SafeAreaView>
	);
}
