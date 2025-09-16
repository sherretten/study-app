import { classQueries } from '@/db/queries/classQueries';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Card, IconButton, TextInput, useTheme } from 'react-native-paper';


export default function Classes() {
	const [classes, setClasses] = useState<{ id: number, name: string }[]>([{ id: 1, name: 'Evidence Based Practice' }, { id: 2, name: 'Neuro' }, { id: 3, name: "Community Engagement" }]);
	const [showAdd, setShowAdd] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [courseName, setCourseName] = useState('');

	const theme = useTheme();

	const fetchClasses = useCallback(async () => {
		const classes = await classQueries.getClasses();
		setClasses(classes);
	}, []);

	useEffect(() => { fetchClasses() }, [fetchClasses])

	const handleSave = useCallback(async () => {
		try {
			const res = await classQueries.createClass(courseName);
			console.log("Successfully saved class", res)
			setShowAdd(false);
		} catch (err) {
			console.error("error adding new course", err)
		}
	}, [courseName]);

	return (
		<SafeAreaView style={{
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			gap: 1,
			backgroundColor: theme.colors.background,
		}}>
			{/* Add button that drops down an input */}
			<IconButton style={{ justifyContent: 'flex-end' }} mode='outlined' onPress={() => setShowAdd(!showAdd)} icon='plus'></IconButton>
			{showAdd &&
				<Card>
					<Card.Title title='New Course'></Card.Title>
					<Card.Content>
						<TextInput mode='outlined' placeholder='Course' value={courseName} onChangeText={(e) => setCourseName(e)} />
					</Card.Content>
					<Card.Actions>
						<Button onPress={handleSave} loading={isSaving}>Save</Button>
					</Card.Actions>
				</Card>
			}
			<View style={{ width: 100, }}>
				{classes.map(course => {
					return (
						<Card style={{ marginBottom: 2, alignItems: 'center' }} key={course.id} onPress={() => router.push(`/course/${course.id}`)}>
							<Card.Title title={course.name} />
						</Card>
					)
				})}
			</View>
		</SafeAreaView>
	)
}