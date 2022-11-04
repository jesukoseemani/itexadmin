const initialAuthState = {
	loadingState: false,
};

export const loadingStatePayReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case 'LOADINGSTATE': {
			return {
				...state,

				loadingState: action.loadingState,
			};
		}

		default: {
			return state;
		}
	}
};

export default loadingStatePayReducer;
