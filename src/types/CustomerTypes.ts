import React, { ReactNode } from 'react';

export interface CustomerModuleData {
	id: string;
	blacklistreason: string;
	email: string;
	firstname: number;
	lastname: string;
	identifier: string;
	merchantcode: string;
	isblacklisted: string;
	action: any;
}



export const ColumnCustomerModule = [
	{
		Header: 'ID',
		accessor: 'id',
	},
	{
		Header: 'Blacklist reason',
		accessor: 'blacklistreason',
	},
	{
		Header: 'Email',
		accessor: 'email',
	},
	{
		Header: 'Firstname',
		accessor: 'firstname',
	},
	{
		Header: 'Lastname',
		accessor: 'lastname',
	},
	{
		Header: 'Identifier',
		accessor: 'identifier',
	},
	{
		Header: 'Merchantcode',
		accessor: 'merchantcode',
	},
	{
		Header: 'Isblacklisted',
		accessor: 'isblacklisted',
	},
	{
		Header: 'Action',
		accessor: 'action',
	},
];
