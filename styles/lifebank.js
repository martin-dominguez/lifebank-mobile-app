import {StyleSheet} from 'react-native';

const lifebank = StyleSheet.create({
    header: {
        backgroundColor: 'transparent',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
    },
    menuCard: {
        height: 60,
        backgroundColor: 'white',
        borderBottomColor: '#EEE',
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    logoImage: {
        height: 24,
        width: 24,
        resizeMode: 'cover',
    },
    alignRight: {
        flex: 1,
        textAlign: "right",
    },
});

export default lifebank;