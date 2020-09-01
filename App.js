import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import CustomDrawerNavigator from './components/CustomDrawerNavigator';
import ErrorBoundary from './components/ErrorBoundary';
import {AppStateProvider} from './hooks/appState';
import appStateReducer, {initialState} from './reducers/appReducer';

import { YellowBox } from 'react-native';
import _ from 'lodash';

// Ignore a couple of warning messages
YellowBox.ignoreWarnings(['Setting a timer']);
YellowBox.ignoreWarnings(['VirtualizedLists should']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  } 
  if (message.indexOf('VirtualizedLists should') <= -1) {
    _console.warn(message);
  }
};

const App = () => {

	return (
		<SafeAreaProvider>
			<ErrorBoundary>
				<NavigationContainer>
					<AppStateProvider
						initialState={initialState}
						reducer={appStateReducer}
					>
						<CustomDrawerNavigator />
					</AppStateProvider>
				</NavigationContainer>
			</ErrorBoundary>
		</SafeAreaProvider>
	);
};

export default App;
