import CreateCard from '@/components/CreateCard';
import FlashCard from '@/components/FlashCard';
import { Text, View } from "react-native";

export default function Index() {

	//fetch classes here. 
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>This page will show all the folders/classes.</Text>
			<FlashCard flashCard={{ key: 'hi', answer: 'hello' }} />
			<CreateCard removeCard={() => null} />
		</View>
	);
}
