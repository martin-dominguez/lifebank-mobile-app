import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from 'react-query';

import HomeCard from '../components/HomeCard';
import Loading from '../components/Loading';
import ErrorDisplay from '../components/ErrorDisplay';
import { useAppState } from '../hooks/appState';

import styles from '../styles/main';

const ITEMS = [
    {
        id: 'accounts',
        name: 'Accounts',
        icon: 'md-list',
        iconType: 'icon',
        value: 0.0,
        items: [],
    },
    {
        id: 'mylife',
        name: 'My LIFE',
        icon: '../assets/icon.png',
        iconType: 'image',
        contentSetId: '',
    },
    {
        id: 'financing',
        name: 'Financing',
        icon: 'md-cash',
        iconType: 'icon',
        value: 123343.99,
    },
    {
        id: 'cards',
        name: 'Cards',
        icon: 'md-card',
        iconType: 'icon',
    },
];


const renderCardList = (items, navigation) => {
    return items.map((item, index) => {
        return (
            <HomeCard key={index} data={item} navigation={navigation} />
        );
    });
}

const MyLifebankScreen = ({navigation}) => {

    const [state, , request] = useAppState();
    const { token, offersId } = state;

    if (!token) {
		return <Loading loading={!token} />;
    }

	const {data, error, refetch, status} = useQuery(
		['accounts'],
		() => {
			return request(
				`/o/bankingdemo/v1.0/accounts?token=${token}`
			);
		}
    );
    
    ITEMS[0].items = data ? data.items : [];
    const _totalBalance = ITEMS[0].items.reduce((total, item) => total + parseFloat(item.balance), 0);
    ITEMS[0].value = _totalBalance;
    ITEMS[1].contentSetId = offersId;

    return (
        <>
            {status === 'error' && (
                <ErrorDisplay
                    error={error.message}
                    onRetry={() => refetch()}
                />
            )}

            <Loading loading={status === 'loading'}>
                <ScrollView style={[styles.mt1]}>
                    {renderCardList(ITEMS, navigation)}
                </ScrollView>
            </Loading>
        </>
    )
};

export default MyLifebankScreen;