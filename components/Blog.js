import PropTypes from 'prop-types';
import React from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import HTML from 'react-native-render-html';

import {useAppState} from '../hooks/appState';
import styles from '../styles/main';
import {spacing} from '../styles/values';
import {getFullURL} from '../util/url';

const Blog = (props) => {
	const [state] = useAppState();

	return (
		<ScrollView>
			{props.image && (
				<Image
					source={{uri: state.liferayURL + props.image.contentUrl}}
					style={{height: 200, width: '100%'}}
				/>
			)}

			<Text style={[styles.m2, styles.h1]}>{props.headline}</Text>

			<Text style={[styles.mx2, styles.h4]}>
				{props.alternativeHeadline}
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
					html={props.articleBody}
					imagesMaxWidth={
						Dimensions.get('window').width - 2 * spacing[2]
					}
				/>
			</View>
		</ScrollView>
	);
};

Blog.propTypes = {
	alternativeHeadline: PropTypes.string,
	articleBody: PropTypes.string,
	headline: PropTypes.string,
	image: PropTypes.object,
};

export default Blog;
