const initialAuthState = {
	openState: false,
};

export const openStateReducer = (state = initialAuthState, action:any) => {
	switch (action.type) {
		case 'OPENSTATE': {
			return {
				...state,

				openState: action.openState,
			};
		}

		default: {
			return state;
		}
	}
};

export default openStateReducer;
