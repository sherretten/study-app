import { Link, Stack } from 'expo-router';
import { Button } from 'react-native-paper';


export default function Layout() {
	return (
		<Stack
			screenOptions={{
				contentStyle: { backgroundColor: '#283444' },
				headerRight: (props) => <Link {...props} href={`/`}><Button icon='home'>Home</Button></Link>
			}}>
			<Stack.Screen name='edit' options={{ title: 'Edit Set', headerBackButtonMenuEnabled: true }} />
			<Stack.Screen name='test' options={{ title: 'Test Set', headerBackButtonMenuEnabled: true }} />
			<Stack.Screen name='index' options={{ title: 'Set Details', headerBackButtonMenuEnabled: true }} />
		</Stack>
	)
}