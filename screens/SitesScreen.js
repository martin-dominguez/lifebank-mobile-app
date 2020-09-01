import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {useQuery} from 'react-query';

import { LinearGradient } from 'expo-linear-gradient';

import {setSiteAction} from '../actions/site';
import ErrorDisplay from '../components/ErrorDisplay';
import ToggleDrawerButton from '../components/ToggleDrawerButton';
import {useAppState} from '../hooks/appState';

import styles from '../styles/main';
import { colors } from '../styles/values';

const Sites = () => {
	const [state, dispatch, request] = useAppState();

	const {siteId} = state;

	const {data, error, refetch, status} = useQuery(['sites'], () => {
		return request(`/o/headless-admin-user/v1.0/my-user-account/sites`);
	});

	function selectSite(id) {
		dispatch(setSiteAction(id));
	}

	const items = data ? data.items : [];

	const renderItem = ({item}) => {
		const selectedSite = siteId === item.id;

		return (
			<Card style={[styles.m1, {width: '100%'}]} title={item.name}>
				<View>
					{!!item.description && <Text>{item.description}</Text>}

					<Button
						ViewComponent={LinearGradient}
						linearGradientProps={{
							colors: [colors.primary, colors.secondary],
							start: { x: 0, y: 0.5 },
							end: { x: 1, y: 0.5 },
						}}
						disabled={selectedSite}
						onPress={() => selectSite(item.id)}
						title={selectedSite ? 'Selected Site' : 'Select Site'}
					/>
				</View>
			</Card>
		);
	};

	const curSite = items.find(({id}) => id === siteId);

	return (
		<View>
			{items && (
				<FlatList
					ListHeaderComponent={
						<>
							{curSite ? (
								<Text style={[styles.textCenter, styles.m2]}>
									Current Site: {curSite.name}
								</Text>
							) : (
								<Text style={[styles.textCenter, styles.m2]}>
									Select a Site.
								</Text>
							)}

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
										There are no sites to display.
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
					style={styles.mb5}
				/>
			)}
		</View>
	);
};

const Stack = createStackNavigator();

function SitesNavigation({navigation}) {
	return (
		<Stack.Navigator
			initialRouteName="Sites"
			screenOptions={{
				headerRight: () => (
					<ToggleDrawerButton navigation={navigation} />
				),
			}}
		>
			<Stack.Screen
				component={Sites}
				name="Sites"
				options={{title: 'Sites'}}
			/>
		</Stack.Navigator>
	);
}

export default SitesNavigation;
