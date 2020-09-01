import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {Button} from 'react-native-elements';

import styles from '../styles/main';

function ChatButton() {
	return (
		<Button
			buttonStyle={styles.px2}
			color="#fff"
			icon={<Ionicons name="md-text" color={'#fff'} size={32} />}
			onPress={() => alert("CHAT!!")}
			type="clear"
		/>
	);
}

export default ChatButton;
