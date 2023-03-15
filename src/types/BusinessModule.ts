import React, { ReactNode } from 'react';

export interface BusinessModuleData {
	tradingname: string;
	businessemail: string;
	country: string;
	merchantaccounttype: string;
	merchantcode: string;
	status: React.ReactNode;
	createdat: string;
	id: number;
}

export const ColumnBusinessModule = [
	{
		Header: 'Business name',
		accessor: 'tradingname',
	},
	{
		Header: 'Email Address',
		accessor: 'businessemail',
	},
	{
		Header: 'Business Type',
		accessor: 'merchantaccounttype',
	},
	{
		Header: 'Country',
		accessor: 'country',
	},
	{
		Header: 'Merchant code',
		accessor: 'merchantcode',
	},
	{
		Header: 'Status',
		accessor: 'status',
	},
	{
		Header: 'Date',
		accessor: 'createdat',
	},
];

export interface BusinessUserModuleData {
	firstname: string;
	email: string;
	bvn: string;
	phonenumber: string;
	country: string;
	status: React.ReactNode;
	createdat: string;
	lastlogin: string;
	nin: string;
}

export const ColumnBusinessUserModule = [
	{
		Header: 'First Name',
		accessor: 'firstname',
	},
	{
		Header: 'Email Address',
		accessor: 'email',
	},
	{
		Header: 'Phone Number',
		accessor: 'phonenumber',
	},
	{
		Header: 'Country',
		accessor: 'country',
	},
	{
		Header: 'Status',
		accessor: 'status',
	},
	{
		Header: 'Created At',
		accessor: 'createdat',
	},
	{
		Header: 'Last Login',
		accessor: 'lastlogin',
	},
	{
		Header: 'Bvn',
		accessor: 'bvn',
	},
	{
		Header: 'Nin',
		accessor: 'nin',
	},
];

export interface BusinessCustomerModuleData {
	firstname: string;
	email: string;
	msisdn: string;
	phonenumber: string;
	country: string;
	isblacklisted: React.ReactNode;
	createdat: string;
}

export const ColumnBusinessCustomerModule = [
	{
		Header: 'First Name',
		accessor: 'firstname',
	},
	{
		Header: 'Email Address',
		accessor: 'email',
	},
	{
		Header: 'Phone Number',
		accessor: 'phonenumber',
	},
	{
		Header: 'Country',
		accessor: 'country',
	},
	{
		Header: 'Blacklisted',
		accessor: 'isblacklisted',
	},
	{
		Header: 'Blacklist Reason',
		accessor: 'blacklistreason',
	},

	{
		Header: 'msisdn',
		accessor: 'msisdn',
	},
];

export interface BusinessTransactionModuleData {
	business: any;
	amount: string;
	linkingreference: string;
	chargetype: string;
	responsemessage: string;
	timein: string;
}

export const ColumnBusinessTransactionModule = [
	{
		Header: 'Merchant Code',
		accessor: 'business',
	},
	{
		Header: 'Email Address',
		accessor: 'email',
	},
	{
		Header: 'Amount',
		accessor: 'amount',
	},
	{
		Header: 'Reference',
		accessor: 'linkingreference',
	},
	{
		Header: 'Charge Type',
		accessor: 'chargetype',
	},
	{
		Header: 'Response Message',
		accessor: 'responsemessage',
	},

	{
		Header: 'Time In',
		accessor: 'timein',
	},
];

export interface BusinessLimitModuleData {
	category: any;
	transactiontype: string;
	auth: string;
	limit: string;
	min: string;
	max: string;
	status: React.ReactNode;
	createdat: string;
	timein: string;
	payment: string;
	transactionlocale: string;
}

export const ColumnBusinessLimitModule = [
	{
		Header: 'Category',
		accessor: 'category',
	},
	{
		Header: 'Transaction Type',
		accessor: 'transactiontype',
	},
	{
		Header: 'Auth Option',
		accessor: 'auth',
	},
	{
		Header: 'Payment Method',
		accessor: 'payment',
	},
	{
		Header: 'Cum. transaction limit',
		accessor: 'limit',
	},
	{
		Header: 'Min Limit',
		accessor: 'min',
	},
	{
		Header: 'Min Limit',
		accessor: 'max',
	},
	{
		Header: 'Status',
		accessor: 'status',
	},
	{
		Header: 'Created At',
		accessor: 'createdat',
	},

	{
		Header: 'Time Approved',
		accessor: 'timein',
	},
];

export interface BusinessFeeModuleData {
	category: any;
	transactiontype: string;
	auth: string;
	fee: string;
	min: string;
	max: string;
	bear: string;
	status: React.ReactNode;
	createdat: string;
	timein: string;
	payment: string;
	transactionlocale?: string;
	cumulativeTransactionLimit?: string;
	id?: number;
}

export const ColumnBusinessFeeModule = [
	{
		Header: 'Category',
		accessor: 'category',
	},
	{
		Header: 'Transaction Type',
		accessor: 'transactiontype',
	},
	{
		Header: 'Auth Option',
		accessor: 'auth',
	},
	{
		Header: 'Fee Setting',
		accessor: 'fee',
	},
	{
		Header: 'Fee Min',
		accessor: 'min',
	},
	{
		Header: 'Fee Cap',
		accessor: 'max',
	},
	{
		Header: 'Merchant has bearer',
		accessor: 'bear',
	},
	{
		Header: 'Status',
		accessor: 'status',
	},
	{
		Header: 'Created At',
		accessor: 'createdat',
	},

	{
		Header: 'Time Approved',
		accessor: 'timein',
	},
];

export interface BusinessScheduleModuleData {
	category: any;
	transactiontype: string;
	auth: string;
	fee: string;
	min: string;
	max: string;
	bear: string;
	status: React.ReactNode;
	createdat: string;
	timein: string;
}

export const ColumnBusinessScheduleModule = [
	{
		Header: 'Category',
		accessor: 'category',
	},
	{
		Header: 'Transaction Type',
		accessor: 'transactiontype',
	},
	{
		Header: 'Auth Option',
		accessor: 'auth',
	},
	{
		Header: 'Fee Setting',
		accessor: 'fee',
	},
	{
		Header: 'Fee Min',
		accessor: 'min',
	},
	{
		Header: 'Fee Cap',
		accessor: 'max',
	},
	{
		Header: 'Merchant has bearer',
		accessor: 'bear',
	},
	{
		Header: 'Status',
		accessor: 'status',
	},
	{
		Header: 'Created At',
		accessor: 'createdat',
	},

	{
		Header: 'Time Approved',
		accessor: 'timein',
	},
];
