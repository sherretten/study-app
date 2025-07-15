import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';



export default function FlashCard(props: { flashCard }) {
	const [showAnswer, setShowAnswer] = useState(false)
	const animatedValue = useRef(new Animated.Value(0)).current;

	const frontInterpolate = animatedValue.interpolate({
		inputRange: [0, 180],
		outputRange: ['0deg', '180deg'],
	});

	const backInterpolate = animatedValue.interpolate({
		inputRange: [0, 180],
		outputRange: ['180deg', '360deg'],
	});

	const flipCard = () => {
		if (showAnswer) {
			Animated.spring(animatedValue, {
				toValue: 0,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.spring(animatedValue, {
				toValue: 180,
				useNativeDriver: true,
			}).start();
		}
		setShowAnswer(!showAnswer);
	};

	return (
		<Pressable onPress={flipCard}>
			<Animated.View style={[styles.card, { transform: [{ rotateX: frontInterpolate }] }]}>
				<Text>{!showAnswer && props.flashCard.key}</Text>
			</Animated.View>
			<Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateX: backInterpolate }] }]}>
				<Text>{showAnswer && props.flashCard.answer}</Text>
			</Animated.View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		gap: 2,
		padding: 15,
		// flex: 1,
		borderRadius: 6,
		borderColor: '#0f172b',
		borderWidth: 3,
	},
	inputContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	input: {
		padding: 5,
		borderRadius: 6,
		borderColor: '#0f172b',
		borderWidth: 2,
		height: 40,
	},
	card: {
		width: 400,
		height: 250,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2196F3',
		backfaceVisibility: 'hidden',
		position: 'absolute',
		borderRadius: 6,
	},
	cardBack: {
		backgroundColor: '#4caf50',
	},
});