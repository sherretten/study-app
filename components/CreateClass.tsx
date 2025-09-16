import { Globals } from '@/constants/BaseStyles';
import { classQueries } from '@/db/queries/classQueries';
import { router } from 'expo-router';
import { useState } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default function CreateClass() {
	const [className, setClassName] = useState('');

	async function handleSave() {
		try {
			await classQueries.createClass(className);
			router.back();
		} catch (err) {
			console.error('Error saving new class', err);
		}
	}

	return (
		<SafeAreaView>
			<Text>Class Name</Text>
			<TextInput style={Globals.input} placeholder='Class Name' onChangeText={(text) => setClassName(text)} value={className}></TextInput>
			<Button onPress={handleSave} title={'Save'}></Button>
		</SafeAreaView>
	)
}