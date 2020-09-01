import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import React from 'react';

import ToggleDrawerButton from '../components/ToggleDrawerButton';
import ChatButton from '../components/ChatButton';
import GradientHeader from '../components/GradientHeader';
import CustomTabNavigator from '../components/CustomTabNavigator';
import Account from '../components/Account';
import LBContent from '../components/LBContent';
import {useAppState} from '../hooks/appState';

import lifeStyles from '../styles/lifebank';


const Stack = createStackNavigator();

const Home = () => {
	return (
		<CustomTabNavigator />
	);
};

const ViewAccount = ({route}) => {
	return (
		<Account {...route.params} />
	);
};

const LBContentDetail = ({route}) => {
	return (
		<LBContent {...route.params} /> // TODO - PRODUCT
	);
};

function HomeNavigator({navigation}) {
	const [state] = useAppState();
	const {name} = state;

	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				header: (props) => (
					<GradientHeader {...props} />
				),
				headerLeft: () => (
						<ToggleDrawerButton navigation={navigation} />
				),
				headerRight: () => (
					<ChatButton /> 
				),
			}}
			
		>
			<Stack.Screen
				component={Home}
				name="Home"
				options={{
					headerTitle: name,
					headerTitleAlign: "center",
					headerStyle: lifeStyles.header,
					headerTintColor: '#fff',
				}}
			/>
			<Stack.Screen
				component={ViewAccount}
				name="AccountHistory"
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
			<Stack.Screen
				component={LBContentDetail}
				name="ViewLBContent"
				options={({route}) => {
					return {
						title: route.params.title,
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

export default HomeNavigator;
