import { Card } from '@/db/types';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function FlashCard(props: { flashCard: Card }) {
	const [showAnswer, setShowAnswer] = useState(false);
	const animatedValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (showAnswer) {
			Animated.spring(animatedValue, {
				toValue: 0,
				useNativeDriver: true,
			}).start();
			setShowAnswer(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.flashCard]);

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
		<Pressable onPress={flipCard} style={styles.cardContainer}>
			<Animated.View style={[styles.card, { transform: [{ rotateX: frontInterpolate }], overflow: 'scroll' }]}>
				<Text style={styles.cardText} variant='displaySmall' adjustsFontSizeToFit>{!showAnswer && props?.flashCard?.term}</Text>
			</Animated.View>
			<Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateX: backInterpolate }], overflow: 'scroll' }]}>
				<Text style={styles.cardText} variant='displaySmall' adjustsFontSizeToFit>{showAnswer && props?.flashCard?.definition}</Text>
			</Animated.View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		position: 'relative',
		width: '100%',
		minHeight: 300,
	},
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
	flagButton: {
		position: 'absolute',
		top: 10,
		right: 20,
		zIndex: 10,
	},
	cardText: {
		textAlign: 'center',
		padding: 4,
	},
});