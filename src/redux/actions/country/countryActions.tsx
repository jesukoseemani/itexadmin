import { COUNTRY } from '../constants';
import { ReactNode } from 'react';

export const saveCountry = (countryDetails: any) => {
	return {
		type: COUNTRY,
		countryDetails,
	};
};
