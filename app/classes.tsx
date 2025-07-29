import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Card, IconButton, TextInput } from 'react-native-paper';


export default function Classes() {
	// Grab classes
	const [classes, setClasses] = useState<{ id: number, course: string }[]>([{ id: 1, course: 'Evidence Based Practice' }, { id: 2, course: 'Neuro' }, { id: 3, course: "Community Engagement" }]);
	const [showAdd, setShowAdd] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	const fetchClasses = () => {

	}

	const handleSave = () => {

		try {

			setShowAdd(false);
		} catch (err) {
			console.error("error adding new course",)
		}
	}

	return (
		<SafeAreaView>
			{/* Add button that drops down an input */}
			<IconButton onPress={() => setShowAdd(!showAdd)} icon='add'></IconButton>
			{showAdd &&
				<Card>
					<Card.Title title='New Course'></Card.Title>
					<Card.Content>
						<TextInput mode='outlined' placeholder='Course' />
					</Card.Content>
					<Card.Actions>
						<Button onPress={handleSave} loading={isSaving} >Save</Button>
					</Card.Actions>
				</Card>
			}

			{classes.map(course => {
				return (
					<Card key={course.id} onPress={() => router.push(`/course/${course.id}`)}>
						<Card.Title title={course.course} />
					</Card>
				)
			})}
		</SafeAreaView>
	)
}