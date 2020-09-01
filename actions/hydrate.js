import {asyncMultiGet} from '../util/async';

export const asyncKeys = [
	'accountId',
	'auth',
	'authenticationType',
	'clientId',
	'liferayURL',
	'siteId',
	'userId',
	'username',
	'name',
	'token',
	'offersId',
	'productsId',
];

const hydrate = () => (dispatch) => {
	asyncMultiGet(asyncKeys)
		.then((resObj) => {
			dispatch({
				data: {...resObj},
				type: 'HYDRATE',
			});
		})
		.catch(() => {
			dispatch({
				data: {
					error: 'Unable to load user preferences.',
					isLoading: false,
				},
				type: 'ERROR',
			});
		});
};

export default hydrate;
