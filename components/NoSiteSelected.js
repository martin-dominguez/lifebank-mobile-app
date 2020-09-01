import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';

import styles from '../styles/main';
import { colors } from '../styles/values';

function NoSiteSelected() {
	const navigation = useNavigation();

	return (
		<View style={styles.m2}>
			<Text style={[styles.textCenter, styles.mb2]}>
				Please select a site in order to view.
			</Text>

			<Button
				ViewComponent={LinearGradient}
				linearGradientProps={{
					colors: [colors.primary, colors.secondary],
					start: { x: 0, y: 0.5 },
					end: { x: 1, y: 0.5 },
				}}
				onPress={() => navigation.navigate('Sites')}
				title="Select a Site"
			/>
		</View>
	);
}

export default NoSiteSelected;
