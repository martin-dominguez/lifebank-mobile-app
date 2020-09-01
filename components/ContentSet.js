import React from 'react';
import PropTypes from 'prop-types';

import {FlatList, RefreshControl, Text, View, TouchableOpacity} from 'react-native';
import {Image, Icon} from 'react-native-elements';
import {useQuery} from 'react-query';

import {useAppState} from '../hooks/appState';
import ErrorDisplay from './ErrorDisplay';
import styles from '../styles/main';
import {colors} from '../styles/values';

const ContentSet = ({contentSetId, navigation}) => {
	const [state, , request] = useAppState();

	const {data, error, refetch, status} = useQuery(
		contentSetId && ['contentSet', contentSetId],
		() => {
			return request(
				`/o/headless-delivery/v1.0/content-sets/${contentSetId}/content-set-elements`
			);
		}
	);

	const items = data ? data.items : [];

	return (
		<View>
			{status === 'error' && (
				<ErrorDisplay error={error.message} onRetry={() => refetch()} />
			)}

			{items && items.length === 0 && status === 'success' && (
				<Text style={[styles.m2, styles.textCenter]}>
					There are no items to display.
				</Text>
			)}

			{items && (
				<FlatList
					data={items}
					keyExtractor={({id}) => id.toString()}
					refreshControl={
						<RefreshControl
							onRefresh={() => refetch()}
							refreshing={status === 'loading'}
						/>
					}
					renderItem={({item}) => {
						const fields = {};
						item.content.contentFields.map((field) => {
							const _id = "_" + field.label.toLowerCase();
							if (field.dataType === 'string') { fields[_id] = field.value.data; }
							else if (field.dataType === 'image') { fields[_id] = field.value.image.contentUrl; }
						})
						return (
							<TouchableOpacity
								key={item.id}
								onPress={()=>navigation.navigate('ViewLBContent', {
									...item,
								})} 
								style={[styles.p1, styles.mx1, styles.mt2, 
									{
										display: 'flex', 
										flexDirection: 'row', 
										backgroundColor: 'white', 
										borderRadius: 5
									}
								]}
							>
								<Image
									source={{uri: state.liferayURL + fields._image}}
									style={{ width: 150, height: 100, flex:1 }}
								/>
					
								<View style={[styles.ml1, {flex: 1, justifyContent: 'center', flexDirection: 'row', display: 'flex'}]}>
									<Text style={[styles.h6, styles.mr1, {flex: 1, justifyContent: 'center', textAlign: 'left'}]}>{item.title}</Text>
									<Icon 
												name="chevron-right"
												type="font-awesome" 
												size={24} 
												color={colors.primary}
												style={{flex: 1, justifyContent: 'center', textAlign: "right"}}
											/>
								</View>
							</TouchableOpacity>
						)}
					}
				/>
			)}
		</View>
	);
};

ContentSet.propTypes = {
	contentSetId: PropTypes.string,
};

export default ContentSet;
