import React, { ReactNode } from 'react';

export interface SettlementModuleData {
	id: string;
	amount: string;
	bank_code: string;
	account_name: number;
	country: string;
	account_no:string;
	businessemail:string;
	settlement_id: string;
	date: string;
}



export const ColumnSettlementModule = [
	{
		Header: 'Settlement ID',
		accessor: 'settlement_id',
	},
	{
		Header: 'Account Name',
		accessor: 'account_name',
	},
    {
        Header: 'Account number',
        accessor: 'account_no',
    },
    {
        Header: 'Amount',
        accessor: 'amount',
    },
	{
		Header: 'Bank code',
		accessor: 'bank_code',
	},
	{
		Header: 'Email',
		accessor: 'businessemail',
	},
	{
		Header: 'Country',
		accessor: 'country',
	},
	{
		Header: 'Date',
		accessor: 'date',
	},
];
export interface SettlementTransactionModuleData {
	merchantId: string;
	amount: string;
	currency: string;
	status: number;
	linkingreference:string;
	chargetype:string;
	// settlement_id: string;
	date: string;

}



export const ColumnSettlementTransactionModule = [
	// {
	// 	Header: 'Settlement ID',
	// 	accessor: 'settlement_id',
	// },
	{
		Header: 'Linking reference',
		accessor: 'linkingreference',
	},
	{
		Header: 'Charge type',
		accessor: 'chargetype',
	},
    {
        Header: 'Amount',
        accessor: 'amount',
    },
	{
		Header: 'Status',
		accessor: 'status',
	},
	{
		Header: 'Machant id',
		accessor: 'merchantId',
	},
	{
		Header: 'Currency',
		accessor: 'currency',
	},
	{
		Header: 'Date',
		accessor: 'date',
	},
];
