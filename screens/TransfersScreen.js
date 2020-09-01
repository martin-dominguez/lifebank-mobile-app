import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Button } from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';

import {Formik} from 'formik';
import FormContainer from '../components/form/FormContainer';
import FormikPicker from '../components/form/FormikPicker';
import FormikTextInput from '../components/form/FormikTextInput';

import styles from '../styles/main';
import { colors } from '../styles/values';

const TransfersScreen = () => {
    const accounts = [
        {
            label: 'account1', 
            value: 'aksjfdlajslkfdjas',
        },
        {
            label: 'account12', 
            value: 'afdasdfasdafddsaf',
        }
    ];

    return (
        <View style={[styles.centerContent, styles.px2, {backgroundColor: 'white'}]}>
            <FormContainer>
                <Formik>
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <Text style={[styles.h3, styles.my2, styles.textCenter]}>Transfer Money</Text>

                            <FormikPicker
                                key='sourceaccount'
                                label='Source Account'
                                name='sourceAccount'
                                options={accounts}
                                values={accounts}
                                errors
                            />

                            <FormikTextInput
                                containerStyle={[styles.mb1, {backgroundColor: 'rgba(0,0,0,0.1)'}]}
                                key='targetaccount'
                                name='targetAccount'
                                style={{
                                    borderRadius: 0,
                                    borderWidth: 0,
                                    marginTop: 8,
                                    padding: 16,
                                    paddingTop: 8,
                                }}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                placeholder='Target Account'
                            />

                            <FormikTextInput
                                containerStyle={[styles.mb1, {backgroundColor: 'rgba(0,0,0,0.1)'}]}
                                key='subject'
                                name='subject'
                                style={{
                                    borderRadius: 0,
                                    borderWidth: 0,
                                    marginTop: 8,
                                    padding: 16,
                                    paddingTop: 8,
                                }}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                placeholder='Transfer subject'
                            />

                            <FormikTextInput
                                containerStyle={[styles.mb1, {backgroundColor: 'rgba(0,0,0,0.1)'}]}
                                key='money'
                                name='money'
                                style={{
                                    borderRadius: 0,
                                    borderWidth: 0,
                                    marginTop: 8,
                                    padding: 16,
                                    paddingTop: 8,
                                }}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                placeholder='Money Amount'
                            />

                            <Button
                                style={styles.m2}
                                title="Submit"
                                onPress={handleSubmit}
                                ViewComponent={LinearGradient} // Don't forget this!
                                linearGradientProps={{
                                    colors: [colors.primary, colors.secondary],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                }}
                            />

                        </View>
                    )}
                </Formik>
            </FormContainer>
        </View>
    );
};

const transferStyles = StyleSheet.create({
	image: {
		alignSelf: 'center',
		height: 100,
		width: 100,
	},
});

export default TransfersScreen;