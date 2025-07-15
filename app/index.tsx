import CreateCard from '@/components/CreateCard';
import FlashCard from '@/components/FlashCard';
import { SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { View } from "react-native";

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
			<Suspense fallback={<View>Loading...</View>}>
				<SQLiteProvider databaseName='study-app' useSuspense>
					{/* Do we want a router here? */}
					<View>
						<FlashCard flashCard={{ key: 'Front', answer: 'Back' }} />
					</View>
					<CreateCard removeCard={() => null} />
				</SQLiteProvider>
			</Suspense>
		</View>
	);
}
