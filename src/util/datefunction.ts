import moment from 'moment';

export const dateNow = moment().format('YYYY-MM-DD');
export const sevenDaysAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
export const thirtyDaysAgo = moment().subtract(30, 'day').format('YYYY-MM-DD');
export const startOfYear = moment().subtract(365, 'day').format('YYYY-MM-DD');
export const endOfYear = moment().format('YYYY-MM-DD');
