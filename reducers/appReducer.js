const initialState = {
	accountId: null,
	authenticationType: 'basic',
	clientId: 'id-2d52e3e0-6e9f-4d2b-7daf-6371d2eb3213',
	error: undefined,
	isConfigured: false,
	isLoading: true,
	lang: 'en_US',
	liferayURL: 'http://127.0.0.1:8080',
	loggedIn: {
		error: null,
		loading: true,
		value: false,
	},
	siteId: null,
	userId: null,
	username: 'ali@liferay.com',
	name: null,
	token: null,
	acocunts: [],
	totalBalance: null,
};

const appStateReducer = (state, action) => {
	const {data = {}, type} = action;

	switch (type) {
		case 'ERROR': {
			return {
				...state,
				...data,
			};
		}
		case 'HYDRATE': {
			return {
				...state,
				accountId: data.accountId || state.accountId,
				authenticationType:
					data.authenticationType || state.authenticationType,
				clientId: data.clientId || state.clientId,
				isConfigured: data.clientId && data.liferayURL ? true : false,
				isLoading: false,
				liferayURL: data.liferayURL || state.liferayURL,
				loggedIn: {
					error: null,
					loading: false,
					value: data.auth ? true : false,
				},
				siteId: data.siteId || state.siteId,
				userId: data.userId || state.userId,
				username: data.username || state.username,
				name: data.name || state.name,
				token: data.token || state.token,
				totalBalance: data.totalBalance || state.totalBalance, // Remove?
				offersId: data.offersId || state.offersId,
				productsId: data.productsId || state.productsId
			};
		}
		case 'LOGGED_IN': {
			return {
				...state,
				loggedIn: {
					error: null,
					loading: false,
					value: true,
				},
				username: data,
			};
		}
		case 'LOGGED_OUT': {
			return {
				...state,
				loggedIn: {
					error: data.error,
					loading: false,
					value: false,
				},
				panelOpen: false,
				userId: null,
			};
		}
		case 'LOGGING_IN': {
			return {
				...state,
				loggedIn: {
					...state.loggedIn,
					error: null,
					loading: true,
				},
			};
		}
		case 'LOGGING_OUT': {
			return {
				...state,
				loggedIn: {
					...state.loggedIn,
					loading: true,
				},
			};
		}
		case 'RESET': {
			return {
				...initialState,
			};
		}
		case 'SAVED_CONFIGURATION': {
			return {
				...state,
				...data,
				isConfigured: true,
			};
		}
		case 'SET_TOKEN': {
			return {
				...state,
				token: data,
			};
		}
		case 'SET_SITE': {
			return {
				...state,
				siteId: data,
			};
		}
		case 'SET_USER_ID': {
			return {
				...state,
				userId: data,
			};
		}
		case 'SET_USER_NAME': {
			return {
				...state,
				name: data,
			};
		}
		default:
			return state;
	}
};

export {initialState};

export default appStateReducer;
