import { combineReducers } from 'redux';

import navbar from './navbar/Index';
import toast from './toast/index';
import modal from './modal/index';
import loader from './loader/index';
import products from './products/index';
import planReducer from './plans/index';
import drawerReducer from './selectedDrawer/index';
import menuReducer from './selectedMenu/index';
import authPayReducer from './auth/index';
import permissionPayReducer from './permission/index';
import mePayReducer from './me/index';
import menuValueReducer from './menuValue';
import userDetailPayReducer from './userDetails/index';
import transactionDetailReducer from './transactionDetails/index';
import loadingStatePayReducer from './loadingState/index';
import countryReducer from './country/index';

const rootReducer = combineReducers({
	// customizer,
	// auth,
	// navbar,
	permissionPayReducer,
	transactionDetailReducer,
	userDetailPayReducer,
	loadingStatePayReducer,
	planReducer,
	menuValueReducer,
	authPayReducer,
	countryReducer,
	mePayReducer,
	menuReducer,
	drawerReducer,
	toast,
	modal,
	loader,
	products,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
