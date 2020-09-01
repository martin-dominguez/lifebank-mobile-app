import {asyncMultiSet} from '../util/async';
import {logoutAction} from './auth';

export const save = (values) => (dispatch, getState) => {
	const {authenticationType} = getState();

	values = {
		...values,
		userId: null,
	};

	asyncMultiSet(values).then(() => {
		console.log(values);
		if (values.authenticationType !== authenticationType) {
			dispatch(logoutAction());
		}

		dispatch({
			data: values,
			type: 'SAVED_CONFIGURATION',
		});
	});
};
