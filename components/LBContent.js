import PropTypes from 'prop-types';
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {Image, Card} from 'react-native-elements';
import HTML from 'react-native-render-html';

import {useAppState} from '../hooks/appState';
import styles from '../styles/main';
import {spacing} from '../styles/values';
import {getFullURL} from '../util/url';

const LBContent = (props) => {
	const [state] = useAppState();

	const fields = {};
	props.content.contentFields.map((field) => {
		const _id = "_" + field.label.toLowerCase();
		if (field.dataType === 'string') { fields[_id] = field.value.data; }
		else if (field.dataType === 'image') { fields[_id] = field.value.image.contentUrl; }
	})

	return (
		<Card
			title={props.title}
		>
			<Image
				source={{uri: state.liferayURL + fields._image}}
				style={{height: 200, width: '100%'}}
			/>

			<Text style={[styles.mx2, styles.h4]}>
				{fields._title}
			</Text>

			<View style={styles.m2}>
				<HTML
					alterNode={(node) => {
						const {name} = node;

						if (name === 'img') {
							node.attribs = {
								...(node.attribs || {}),
								src: getFullURL(
									node.attribs.src,
									state.liferayURL
								),
							};
						}

						return node;
					}}
					html={fields._subtitle}
					imagesMaxWidth={
						Dimensions.get('window').width - 2 * spacing[2]
					}
				/>
			</View>
		</Card>
	);
};

LBContent.propTypes = {
	title: PropTypes.string,
};

export default LBContent;
