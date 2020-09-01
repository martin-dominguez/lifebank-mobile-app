import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import React from 'react';
import {RefreshControl, Text, View, FlatList} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {useQuery} from 'react-query';

import { LinearGradient } from 'expo-linear-gradient';

import ErrorDisplay from '../components/ErrorDisplay';
import NoSiteSelected from '../components/NoSiteSelected';
import ToggleDrawerButton from '../components/ToggleDrawerButton';
import GradientHeader from '../components/GradientHeader';
import ChatButton from '../components/ChatButton';
import Form from '../components/form/Form';
import {useAppState} from '../hooks/appState';

import styles from '../styles/main';
import { colors } from '../styles/values';
import lifeStyles from '../styles/lifebank';

const FormsScreen = ({navigation}) => {
	const [state, , request] = useAppState();

	const {siteId} = state;

	const {data, error, refetch, status} = useQuery(
		siteId && ['forms', siteId],
		() => {
			return request(`/o/headless-form/v1.0/sites/${siteId}/forms`);
		}
	);

	const items = data ? data.items : [];

	const renderItem = ({item}) => (
		<Card style={[styles.m1, styles.w100]} title={item.name}>
			<View>
				{item.description.length > 0 && (
					<Text style={styles.mb2}>{item.description}</Text>
				)}

				<Button
					ViewComponent={LinearGradient}
					linearGradientProps={{
						colors: [colors.primary, colors.secondary],
						start: { x: 0, y: 0.5 },
						end: { x: 1, y: 0.5 },
					}}
					onPress={() =>
						navigation.navigate('FormEntry', {
							formId: item.id,
							name: item.name,
						})
					}
					title="View Form"
				/>
			</View>
		</Card>
	);

	if (!siteId) {
		return <NoSiteSelected />;
	}

	return (
		<>
			{items && (
				<FlatList
					ListHeaderComponent={
						<>
							{error && (
								<ErrorDisplay
									error={status === 'error'}
									onRetry={() => refetch()}
								/>
							)}

							{items &&
								items.length === 0 &&
								status === 'success' && (
									<Text
										style={[styles.m2, styles.textCenter]}
									>
										There are no forms to display.
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
};

function ViewForm({route}) {
	return <Form formId={route.params.formId} />;
}

const Stack = createStackNavigator();

function FormsNavigator({navigation}) {
	return (
		<Stack.Navigator
			initialRouteName="Requests"
			screenOptions={{
				header: (props) => (
					<GradientHeader {...props} />
				),
				headerLeft: () => (
					<ToggleDrawerButton navigation={navigation} />
				),
				headerRight: () =>  (
					<ChatButton /> 
				),
			}}
		>
			<Stack.Screen
				component={FormsScreen}
				name="Forms"
				options={{
					headerTitle: 'Requests',
					headerTitleAlign: "center",
					headerStyle: lifeStyles.header,
					headerTintColor: '#fff',
				}}
			/>

			<Stack.Screen
				component={ViewForm}
				name="FormEntry"
				options={({route}) => {
					return {
						title: route.params.label,
						headerTitleAlign: "center",
						headerStyle: lifeStyles.header,
						headerLeft: () => (<HeaderBackButton  tintColor = '#FFF' onPress={()=>{navigation.goBack()}}/>),
						headerTintColor: '#fff',
					};
				}}
			/>
		</Stack.Navigator>
	);
}

export default FormsNavigator;
