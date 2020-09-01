
import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from '@react-navigation/stack';

import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../styles/values';

function GradientHeader(props) {

	return (
		<LinearGradient
			colors={[colors.primary, colors.secondary]}
			style={StyleSheet.absoluteFill, {height: 100}}
			start={{ x: 0, y: 1 }}
			end={{ x: 1, y: 0 }}
		>
			<Header {...props} />
		</LinearGradient>
	);
}

export default GradientHeader;