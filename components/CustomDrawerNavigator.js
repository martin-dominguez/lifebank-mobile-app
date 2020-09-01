import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect} from 'react';

import hydrate from '../actions/hydrate';
import CustomDrawerContent from './CustomDrawerContent';
import {useAppState} from '../hooks/appState';
import AccountsScreen from '../screens/AccountsScreen';
import ConfigurationsScreen from '../screens/ConfigurationsScreen';
import DocumentsScreen from '../screens/DocumentsScreen';
import FormsScreen from '../screens/FormsScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerNavigator = () => {
	const [state, dispatch] = useAppState();

	const {isLoading, loggedIn} = state;

	useEffect(() => {
		dispatch(hydrate());
    }, [dispatch, loggedIn.value]);
    
    return (
        <Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			drawerType="back"
			initialRouteName={loggedIn.value ? 'Home' : 'Login'}
		>
			{isLoading && (
				<Drawer.Screen component={SplashScreen} name="Splash" />
			)}

			{!isLoading && loggedIn.value && (
				<>
					<Drawer.Screen
						component={HomeScreen}
						name="Home"
						options={{title: 'Home'}}
					/>
					<Drawer.Screen
						component={AccountsScreen}
						name="Accounts"
						options={{title: 'Accounts'}}
					/>
					<Drawer.Screen
						component={DocumentsScreen}
						name="Documents"
						options={{title: 'Documents'}}
					/>
					<Drawer.Screen
						component={FormsScreen}
						name="Requests"
						options={{title: 'Requests'}}
					/>
				</>
			)}

			{!isLoading && !loggedIn.value && (
				<Drawer.Screen component={LoginScreen} name="Login" />
			)}

			<Drawer.Screen
				component={ConfigurationsScreen}
				name="Configurations"
				options={{title: 'Configurations'}}
			/>
		</Drawer.Navigator>
    );
};

export default CustomDrawerNavigator;
