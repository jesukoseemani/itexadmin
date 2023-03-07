const initialAuthState = {
	permission: {},
};

export const permissionPayReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case 'SAVE_PERMISSION': {
			return {
				...state,

				permission: { ...action.permissionDetails },
			};
		}
		default: {
			return state;
		}
	}
};

export default permissionPayReducer;
