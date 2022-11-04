const initialAuthState = {
	country: {},
};

export const countryReducer = (state = initialAuthState, action: any) => {
	switch (action.type) {
		case 'COUNTRY': {
			return {
				...state,

				country: { ...action.countryDetails },
			};
		}
		default: {
			return state;
		}
	}
};

export default countryReducer;
