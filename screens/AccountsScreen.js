import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { Button, Card } from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';

import { useQuery } from 'react-query';

import ErrorDisplay from '../components/ErrorDisplay';
import ToggleDrawerButton from '../components/ToggleDrawerButton';
import GradientHeader from '../components/GradientHeader';
import ChatButton from '../components/ChatButton';
import { useAppState } from '../hooks/appState';

import styles from '../styles/main';
import { colors } from '../styles/values'
import lifeStyles from '../styles/lifebank';

function Accounts({navigation}) {
	const [state, , request] = useAppState();

	const {token} = state;

	if (!token) {
		return <ErrorDisplay
			error={"A valid token is needed. Try to log in again."}
			onRetry={() => refetch()}
		/>;
	}

	const {data, error, refetch, status} = useQuery(
		['accounts'],
		() => {
			return request(
				`/o/bankingdemo/v1.0/accounts?token=${token}`
			);
		}
	);

	const items = data ? data.items : [];

	const renderItem = ({item}) => (
		<Card
			title={item.label}
		>
			<View>
				<Text style={styles.mb2}>{item.iban}</Text>

				<Button
					ViewComponent={LinearGradient}
					linearGradientProps={{
						colors: [colors.primary, colors.secondary],
						start: { x: 0, y: 0.5 },
						end: { x: 1, y: 0.5 },
					}}
					onPress={() =>
						navigation.navigate('AccountHistory', {
							...item,
						})
					}
					title="View"
				/>
			</View>
		</Card>
	);

	return (
		<>
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
									There are no accounts to display.
								</Text>
							)}
						</>
					}
					data={items}
					keyExtractor={(item) => item.id}
					refreshControl={
						<RefreshControl
							onRefresh={() => refetch()}
							refreshing={status === 'loading'}
						/>
					}
					renderItem={renderItem}
				/>
			)}
		</>
	);
}

const Stack = createStackNavigator();

function AccountsNavigator({navigation}) {
	return (
		<Stack.Navigator
			initialRouteName="Accounts"
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
				component={Accounts}
				name="Accounts"
				options={{
					headerTitle: 'Accounts',
					headerTitleAlign: "center",
					headerStyle: lifeStyles.header,
					headerTintColor: '#fff',
				}}
			/>
		</Stack.Navigator>
	);
}

export default AccountsNavigator;
