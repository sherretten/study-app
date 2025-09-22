import { FlashCard as Card } from '@/constants/Types';
import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function FlashCard(props: { flashCard: Card }) {
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
		<Pressable onPress={flipCard} style={{ position: 'relative', width: 600, height: 300, alignSelf: 'center' }}>
			<Animated.View style={[styles.card, { transform: [{ rotateX: frontInterpolate }] }]}>
				<Text style={{ textAlign: 'center' }} variant='displayMedium'>{!showAnswer && props?.flashCard?.term}</Text>
			</Animated.View>
			<Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateX: backInterpolate }] }]}>
				<Text style={{ textAlign: 'center', padding: 4 }} variant='displaySmall'>{showAnswer && props?.flashCard?.definition}</Text>
			</Animated.View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	card: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2196F3',
		backfaceVisibility: 'hidden',
		position: 'absolute',
		borderRadius: 6,
	},
	cardBack: {
		backgroundColor: '#2196F3',
	},
});