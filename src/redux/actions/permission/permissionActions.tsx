import { SAVE_PERMISSION } from '../constants';
import { ReactNode } from 'react';

export const savePermission = (permissionDetails: any) => {
	return {
		type: SAVE_PERMISSION,
		permissionDetails,
	};
};

