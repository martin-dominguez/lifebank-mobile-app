import React, {useEffect} from 'react';

import hydrate from '../actions/hydrate';
import {useAppState} from '../hooks/appState';
import { Image } from "react-native";

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MyLifebankScreen from '../screens/MyLifebankScreen';
import AccountsScreen from '../screens/AccountsScreen';
import TransfersScreen from '../screens/TransfersScreen';
import ProductsScreen from '../screens/ProductsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../styles/values';
import lifeStyles from '../styles/lifebank';


const Tab = createBottomTabNavigator();

const CustomTabNavigator = () => {
	const [state, dispatch] = useAppState();

    const {isLoading, loggedIn} = state;
    
    useEffect(() => {
		dispatch(hydrate());
    }, [dispatch, loggedIn.value]);

    return (
        <Tab.Navigator 
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Accounts') {
                    iconName = focused ? 'ios-list-box' : 'ios-list';
                } else if (route.name === 'Transfers') {
                    iconName = focused ? 'md-swap' : 'ios-swap';
                } else if (route.name === 'More Products') {
                    iconName = focused ? 'md-briefcase' : 'ios-briefcase'
                }

                if (route.name === 'My LIFE') {
                    return <Image
                        source={require('../assets/icon.png')}
                        style={[lifeStyles.logoImage]}
                        tintColor={focused ? "" : 'gray'} />
                } else {
                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            },
            })}
            tabBarOptions={{
                activeTintColor: colors.primary,
                inactiveTintColor: 'gray',
            }}
            
        >
            {!isLoading && loggedIn.value && (
                <>
                    <Tab.Screen name="My LIFE" component={MyLifebankScreen} />
                    <Tab.Screen name="Accounts" component={AccountsScreen} />
                    <Tab.Screen name="Transfers" component={TransfersScreen} />
                    <Tab.Screen name="More Products" component={ProductsScreen} />
                </>
            )}
        </Tab.Navigator>
    );
};

export default CustomTabNavigator;