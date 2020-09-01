import {Formik} from 'formik';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';

import {loginAction} from '../actions/auth';
import {useAppState} from '../hooks/appState';
import styles from '../styles/main';
import { colors } from '../styles/values';
import Alert from './Alert';
import Loading from './Loading';
import FormContainer from './form/FormContainer';
import FormikTextInput from './form/FormikTextInput';

function Login() {
	const [state, dispatch] = useAppState();

	const {error, loading} = state.loggedIn;

	const {username} = state;

	return (
		<FormContainer>
			<Formik
				initialValues={{
					email: username,
					password: 'test',
				}}
				onSubmit={(values) => {
					dispatch(loginAction(values.email, values.password));
				}}
				validate={(values) => {
					const errors = {};

					if (!values.email) {
						errors.email = 'Required';
					}

					if (!values.password) {
						errors.password = 'Required';
					}

					return errors;
				}}
			>
				{(formikObj) => (
					<View style={{flex: 1}}>
						<Loading loading={loading}>
							<Image
								source={require('../assets/icon.png')}
								style={[loginStyles.image, styles.m4]}
							/>

							{error && (
								<Alert
									containerStyle={styles.m2}
									text={error}
								/>
							)}

							<FormikTextInput
								autoCapitalize="none"
								autoComplete="off"
								autoCorrect={false}
								containerStyle={styles.m2}
								label="Email Address or User Name"
								name={'email'}
								required={true}
								spellCheck={false}
								{...formikObj}
							/>

							<FormikTextInput
								autoCapitalize="none"
								autoComplete="off"
								autoCorrect={false}
								containerStyle={styles.m2}
								label="Password"
								name={'password'}
								required={true}
								secureTextEntry={true}
								spellCheck={false}
								textContentType="password"
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
									Object.keys(formikObj.errors).length > 0 &&
									!formikObj.isSubmitting
								}
								onPress={formikObj.handleSubmit}
								style={styles.m2}
								title="Login"
							/>
						</Loading>
					</View>
				)}
			</Formik>
		</FormContainer>
	);
}

const loginStyles = StyleSheet.create({
	image: {
		alignSelf: 'center',
		height: 100,
		width: 100,
	},
});

export default Login;
