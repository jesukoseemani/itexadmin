const initialMenuValueState = {
	menuDetails: 'payvice',
};

export const menuValueReducer = (state = initialMenuValueState, action: any) => {
	switch (action.type) {
		case 'SAVE_MENU_VALUE': {
			return {
				...state,
				menuDetails: action.menuDetails,
			};
		}
		default: {
			return state;
		}
	}
};

export default menuValueReducer;
