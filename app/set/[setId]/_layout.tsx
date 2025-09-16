import { Stack } from 'expo-router';


export default function Layout() {
	return (
		<Stack>
			<Stack.Screen name='edit' options={{ title: 'Edit Set', headerBackButtonMenuEnabled: true }} />
			<Stack.Screen name='test' options={{ title: 'Test Set', headerBackButtonMenuEnabled: true }} />
			<Stack.Screen name='index' options={{ title: 'Set Details', headerBackButtonMenuEnabled: true }} />
		</Stack>
	)
}