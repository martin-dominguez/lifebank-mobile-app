import {createStackNavigator} from '@react-navigation/stack';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';

import {save} from '../actions/configuration';
import ToggleDrawerButton from '../components/ToggleDrawerButton';
import GradientHeader from '../components/GradientHeader';
import ChatButton from '../components/ChatButton';
import FormContainer from '../components/form/FormContainer';
import FormikPicker from '../components/form/FormikPicker';
import FormikTextInput from '../components/form/FormikTextInput';
import {useAppState} from '../hooks/appState';

import styles from '../styles/main';
import { colors } from '../styles/values';
import lifeStyles from '../styles/lifebank';

const Configurations = () => {
	const [state, dispatch] = useAppState();

	const {authenticationType, clientId, isConfigured, liferayURL, siteId, offersId, productsId} = state;

	function hasUnsavedChanges(values) {
		let retVal;

		Object.keys(values).forEach((key) => {
			if (values[key] !== state[key]) {
				retVal = true;
			}
		});

		if (!isConfigured) {
			retVal = true;
		}

		return retVal;
	}

	return (
		<ScrollView>
			<FormContainer>
				<Formik
					initialValues={{
						authenticationType,
						clientId,
						liferayURL,
						siteId,
						offersId,
						productsId,
					}}
					onSubmit={(values, {setSubmitting}) => {
						dispatch(save(values)).then(() => {
							setSubmitting(false);
						});
					}}
					validate={(values) => {
						const errors = {};

						if (
							!values.clientId &&
							values.authenticationType === 'oauth'
						) {
							errors.clientId = 'Required';
						}

						if (!values.liferayURL) {
							errors.liferayURL = 'Required';
						} else if (values.liferayURL.endsWith('/')) {
							errors.liferayURL =
								'The Liferay server URL must not end with a slash.';
						}

						if (!values.siteId) { errors.siteId = 'Required';}

						return errors;
					}}
				>
					{(formikObj) => (
						<View>
							<Text
								style={[
									configurationStyles.status,
									styles.p2,
									styles.mb2,
								]}
							>
								{hasUnsavedChanges(formikObj.values)
									? 'You have unsaved changes to your configurations.'
									: 'All changes saved.'}

								{formikObj.isSubmitting && 'Saving...'}
							</Text>

							<FormikPicker
								label="Authentication Type"
								name="authenticationType"
								options={[
									{
										label: 'Basic',
										value: 'basic',
									},
									{
										label: 'OAuth',
										value: 'oauth',
									},
								]}
								required={true}
								{...formikObj}
							/>

							{formikObj.values.authenticationType === 'oauth' && (
								<FormikTextInput
									autoCapitalize="none"
									autoComplete="off"
									autoCorrect={false}
									display="ios"
									label="OAuth Client ID"
									name={'clientId'}
									required={
										formikObj.values.authenticationType ===
										'oauth'
									}
									spellCheck={false}
									{...formikObj}
								/>
							)}

							<FormikTextInput
								autoCapitalize="none"
								autoComplete="off"
								autoCorrect={false}
								display="ios"
								label="Liferay Server URL"
								name={'liferayURL'}
								required={true}
								spellCheck={false}
								{...formikObj}
							/>

							<FormikTextInput
								autoCapitalize="none"
								autoComplete="off"
								autoCorrect={false}
								display="ios"
								label="Site ID"
								name={'siteId'}
								required={true}
								spellCheck={false}
								{...formikObj}
							/>

							<FormikTextInput
								autoCapitalize="none"
								autoComplete="off"
								autoCorrect={false}
								display="ios"
								label="Offers ID"
								name={'offersId'}
								required={false}
								spellCheck={false}
								{...formikObj}
							/>
							<FormikTextInput
								autoCapitalize="none"
								autoComplete="off"
								autoCorrect={false}
								display="ios"
								label="Products ID"
								name={'productsId'}
								required={false}
								spellCheck={false}
								{...formikObj}
							/>

							<Button					
								ViewComponent={LinearGradient}
								linearGradientProps={{
									colors: [colors.primary, colors.secondary],
									start: { x: 0, y: 0.5 },
									end: { x: 1, y: 0.5 },
								}}
								disabled={
									Object.keys(formikObj.errors).length > 0 ||
									!hasUnsavedChanges(formikObj.values)
								}
								onPress={formikObj.handleSubmit}
								style={styles.m2}
								title="Save Configurations"
							/>
						</View>
					)}
				</Formik>
			</FormContainer>
		</ScrollView>
		
	);
};

const configurationStyles = StyleSheet.create({
	status: {
		backgroundColor: '#666',
		color: '#FFF',
	},
});

const Stack = createStackNavigator();

function ConfigurationsNavigator({navigation}) {
	return (
		<Stack.Navigator
			initialRouteName="Configurations"
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
				component={Configurations}
				name="Configurations"
				options={{
					headerTitle: 'Configurations',
					headerTitleAlign: "center",
					headerStyle: lifeStyles.header,
					headerTintColor: '#fff',
				}}
			/>
		</Stack.Navigator>
	);
}

export default ConfigurationsNavigator;
