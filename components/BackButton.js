import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {Button} from 'react-native-elements';

import styles from '../styles/main';

function BackButton(navigation) {
	return (
		<Button
			buttonStyle={styles.px2}
			color="#fff"
			icon={<Ionicons name="ion-md-arrow-round-back" color={'#fff'} size={32} />}
			onPress={() => navigation.goBack()}
			type="clear"
		/>
	);
}

export default BackButton;
