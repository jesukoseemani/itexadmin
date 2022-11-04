import { OPENSTATE } from '../constants';
import { ReactNode } from 'react';

export const saveOpen = (openState: boolean) => {
	return {
		type: OPENSTATE,
		openState,
	};
};
