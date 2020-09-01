import React from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {useQuery} from 'react-query';

import { LinearGradient } from 'expo-linear-gradient';

import ErrorDisplay from '../components/ErrorDisplay';
import {useAppState} from '../hooks/appState';

import styles from '../styles/main';
import {colors} from '../styles/values';

const ProductsScreen = ({navigation}) => {
	const [state, , request] = useAppState();

    const {productsId} = state;
    
    const {data, error, refetch, status} = useQuery(
		productsId && ['contentSet', productsId],
		() => {
			return request(
				`/o/headless-delivery/v1.0/content-sets/${productsId}/content-set-elements`
			);
		}
	);

	const items = data ? data.items : [];

	const renderItem = ({item}) => {
        const fields = {};
        item.content.contentFields.map((field) => {
            const _id = "_" + field.label.toLowerCase();
            if (field.dataType === 'string') { fields[_id] = field.value.data; }
            else if (field.dataType === 'image') { fields[_id] = field.value.image.contentUrl; }
        })

        return (        
            <Card
                image={{uri: state.liferayURL + fields._image}}
                style={[styles.m1, {width: '100%'}]}
                title={item.title}
            >
                <View>
                    <Text style={[styles.mb2, styles.textCenter]}>{fields._title}</Text>
    
                    <Button
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors: [colors.primary, colors.secondary],
                            start: { x: 0, y: 0.5 },
                            end: { x: 1, y: 0.5 },
                        }}
                        onPress={() =>
                            navigation.navigate('ViewLBContent', {
                                ...item,
                            })
                        }
                        title="Keep Reading"
                    />
                </View>
            </Card>
        );
    };

	return (
		<>
            <Text style={[styles.h1, styles.mx2, styles.mt2, styles.textCenter]}>We have the best offers for you</Text>
			{items && (
				<FlatList
					ListHeaderComponent={
						<>
							{status === 'error' && (
								<ErrorDisplay
									error={error.message}
									onRetry={() => refetch()}
								/>
							)}

							{items &&
								items.length === 0 &&
								status === 'success' && (
									<Text
										style={[styles.m2, styles.textCenter]}
									>
										There are no blog entries to display.
									</Text>
								)}
						</>
					}
					data={items}
					keyExtractor={({id}) => id.toString()}
					refreshControl={
						<RefreshControl
							onRefresh={() => refetch()}
							refreshing={status === 'loading'}
						/>
					}
					renderItem={(obj) => renderItem(obj)}
				/>
			)}
		</>
	);
}

export default ProductsScreen;