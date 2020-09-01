import React from 'react';
import {useQuery} from 'react-query';
import {Text, View, SafeAreaView, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements';

import ErrorDisplay from '../components/ErrorDisplay';
import Loading from '../components/Loading';
import {useAppState} from '../hooks/appState';

import PropTypes from 'prop-types';

import styles from '../styles/main';

const Account = (props) => {
    const [state, , request] = useAppState();

    const {id, bankId, currency, iban, balance} = props;
    const {token} = state;
    
    const {data, error, refetch, status} = useQuery(
		id && ['account', id],
		() => {
			return request(`/o/bankingdemo/v1.0/accounts/${id}/history?bankId=${bankId}&token=${token}`);
		}
    );
    
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    const renderItem = ({ item }) => {
        const valueColor = item.value.includes('-') ? 'red' : 'green';
        const iconName = valueColor === 'red' ? 'sign-out' : 'sign-in';
        return (
            <ListItem
                bottomDivider
                title={ typeof item.description === 'undefined' ? '-' : item.description}
                subtitle={item.date}
                rightTitle={item.value}
                rightTitleStyle={{ color: valueColor}}
                rightSubtitle={item.newBalance}
                leftIcon= {{ name: iconName, type:'font-awesome', color: valueColor }}
            />
        );
    }

    return (
        <View>
			{data && (
            <SafeAreaView>
                <View style={
                    {
                        alignContent: 'center',
                        color: 'blue',
                        backgroundColor: 'white',
                    }
                }>
                    <Text style={[styles.mx2, styles.mt2, styles.h1, styles.textCenter ]}>{balance} {currency}</Text>
                    <Text style={[styles.mx2, styles.textCenter, {color: '#AAA', fontStyle: 'italic'}]}>{iban}</Text>
                    <Text style={[styles.px1, styles.mt2, styles.py1, {backgroundColor: '#bbb',color: 'white'}]}>
                        HISTORY
                    </Text>
                </View>

                {data && (
                    <Loading loading={status === 'loading'}>
                    <FlatList
                        ListHeaderComponent={
                            <>
                                {status === 'error' && (
                                    <ErrorDisplay
                                        error={error.message}
                                        onRetry={() => refetch()}
                                    />
                                )}
    
                                {data &&
                                    Object.size(data.items) === 0 &&
                                    status === 'success' && (
                                        <Text
                                            style={[styles.m2, styles.textCenter]}
                                        >
                                            There are no transfers to display.
                                        </Text>
                                    )}
                            </>
                        }
                        data={data.items}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                    </Loading>
                )}
            </SafeAreaView>
            )}
        </View>    
    );
};

Account.propTypes = {
	id: PropTypes.string,
	bankId: PropTypes.string,
};

export default Account;