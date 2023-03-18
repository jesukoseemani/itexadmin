import React, { ReactNode } from 'react';

export interface ChargebackModuleData {
	amount: string;
	status: React.ReactNode;
	business_name: string;
	customeremail: string;
	transaction_ref: string;
	reason: string;
	date_created: string;
	date_due: string;
	id: number;
	action: React.ReactNode;
}

export const ColumnChargeBackModule = [
	{
		Header: 'Amount',
		accessor: 'amount',
	},
	{
		Header: 'Status',
		accessor: 'status',
	},
	{
		Header: 'Business name',
		accessor: 'business_name',
	},
	{
		Header: 'Customer email',
		accessor: 'customeremail',
	},
	{
		Header: 'Transaction reference',
		accessor: 'transaction_ref',
	},
	{
		Header: 'Reason',
		accessor: 'reason',
	},
	{
		Header: 'Date created',
		accessor: 'date_created',
	},
	{
		Header: 'Due date',
		accessor: 'date_due',
	},
	{
		Header: '',
		accessor: 'action',
	},
];
