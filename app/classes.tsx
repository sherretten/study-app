import { classQueries } from '@/db/queries/classQueries';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput, useTheme } from 'react-native-paper';

export default function Classes() {
	const [classes, setClasses] = useState<{ id: number, name: string }[]>([]);
	const [showAdd, setShowAdd] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [courseName, setCourseName] = useState('');

	const theme = useTheme();

	const fetchClasses = useCallback(async () => {
		const classes = await classQueries.getClasses();
		setClasses(classes);
	}, []);

	useEffect(() => {
		fetchClasses()
	}, [fetchClasses]);

	const handleSave = useCallback(async () => {
		try {
			await classQueries.createClass(courseName);
			fetchClasses();
			setShowAdd(false);
		} catch (err) {
			console.error("error adding new course", err)
		}
	}, [courseName, fetchClasses]);

	return (
		<Card style={styles.container}>
			<Card.Content>
				<View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
					<Text variant='displaySmall'>Courses</Text>
					<Button style={{ margin: 1 }} buttonColor={theme.colors.primary}
						textColor='white'
						mode='outlined'
						onPress={() => setShowAdd(!showAdd)}
						icon='plus'>
						Add Course
					</Button>
				</View>
				<View>
					{showAdd &&
						<Card style={{ marginBottom: 16 }}>
							<Card.Title title='New Course'></Card.Title>
							<Card.Content>
								<TextInput placeholder='Course' value={courseName} onChangeText={(e) => setCourseName(e)} />
							</Card.Content>
							<Card.Actions>
								<Button onPress={() => { setCourseName(''); setShowAdd(false) }}>Cancel</Button>
								<Button onPress={handleSave} loading={isSaving} disabled={courseName.length === 0}>Save</Button>
							</Card.Actions>
						</Card>
					}
				</View>
				<View style={{ flexDirection: 'row', maxWidth: '90%', flexWrap: 'wrap' }}>
					{classes.map(course => {
						return (
							<Card style={{ marginBottom: 2, alignItems: 'center', minWidth: 100 }} key={course.id} onPress={() => router.push(`/course/${course.id}`)}>
								<Card.Content><Text>{course.name}</Text></Card.Content>
							</Card>
						)
					})}
				</View>
			</Card.Content>
		</Card>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
	},
	header: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
})