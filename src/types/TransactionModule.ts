import React, { ReactNode } from 'react';

export interface TransactionModuleData {
	merchant_id: string;
	merchant_name: string;
	transaction_ref: string;
	amount: string;
	status: React.ReactNode;
	payment_type: string;
	date: string;
	paymentid:string,
	id: number;
}

export const ColumnTransactionModule = [
	{
		Header: 'Merchant ID',
		accessor: 'merchant_id',
	},
	{
		Header: 'Merchant Name',
		accessor: 'merchant_name',
	},
	{
		Header: 'Transaction Reference',
		accessor: 'transaction_ref',
	},
	{
		Header: 'Amount',
		accessor: 'amount',
	},
	{
		Header: 'Payment Type',
		accessor: 'payment_type',
	},
	{
		Header: 'Status',
		accessor: 'status',
	},
	{
		Header: 'Date',
		accessor: 'date',
	},
];
