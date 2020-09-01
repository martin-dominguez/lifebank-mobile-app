import {asyncMultiSet, asyncRemove} from '../util/async';
import {statefulLogin} from '../util/request';

export const loginAction = (username, password) => (
	dispatch,
	getState,
	request
) => {
	dispatch({type: 'LOGGING_IN'});

	statefulLogin(getState())({
		password,
		username,
	})
		.then(() => {
			dispatch({
				data: username,
				type: 'LOGGED_IN',
			});

			request('/o/headless-admin-user/v1.0/my-user-account').then(
				(res1) => {
					dispatch(setUserAction(res1.id));
					dispatch(setNameAction(res1.name))
					request(`/o/bankingdemo/v1.0/obptoken/${res1.id}`).then(
						(res2) => {
							let token = res2.token;
							dispatch(setTokenAction(token));
						}
					)
				}
			);
			asyncMultiSet({username});
		})
		.catch((err) => {
			dispatch({
				data: {
					error: "There was an error logging in: " + err,
				},
				type: 'LOGGED_OUT',
			});
		});
};

export const logoutAction = () => (dispatch) => {
	dispatch({type: 'LOGGING_OUT'});

	asyncRemove('auth')
		.then(() => {
			dispatch({type: 'LOGGED_OUT'});
		})
		.catch(() => {
			dispatch({
				data: {
					error: 'There was an error while loggin out.',
				},
				type: 'LOGGED_OUT',
			});
		});
};

const setUserAction = (userId) => (dispatch) => {
	asyncMultiSet({userId}).then(() => {
		dispatch({
			data: userId,
			type: 'SET_USER_ID',
		});
	});
};

const setNameAction = (name) => (dispatch) => {
	asyncMultiSet({name}).then(() => {
		dispatch({
			data: name,
			type: 'SET_USER_NAME',
		});
	});

};

const setTokenAction = (token) => (dispatch) => {
	asyncMultiSet({token}).then(() => {
		dispatch({
			data: token,
			type: 'SET_TOKEN'
		});
	});
};