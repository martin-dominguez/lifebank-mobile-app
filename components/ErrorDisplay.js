import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';

import styles from '../styles/main';
import { colors } from '../styles/values';

function ErrorDisplay({error, onRetry}) {
	return (
		<View style={styles.m2}>
			<Text style={[styles.mb2, styles.textCenter]}>
				{error ? error : 'There is an error.'}
			</Text>

			<Button
				ViewComponent={LinearGradient}
				linearGradientProps={{
					colors: [colors.primary, colors.secondary],
					start: { x: 0, y: 0.5 },
					end: { x: 1, y: 0.5 },
				}}
				onPress={onRetry} 
				title="Retry Request" 
			/>
		</View>
	);
}

export default ErrorDisplay;
