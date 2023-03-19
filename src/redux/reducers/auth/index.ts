const initialAuthState = {
	auth:{}
};

export const authPayReducer = (state = initialAuthState, action:any) => {
	switch (action.type) {
		case 'SAVE_AUTH': {
			return {
				...state,

				auth: { ...action.authDetails },
			};
		}
		case 'LOG_OUT': {
			return {
				...state,
				auth: {},
			};
		}
		default: {
			return state;
		}
	}
};

export default authPayReducer;
