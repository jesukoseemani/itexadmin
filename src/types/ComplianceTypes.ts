
import { ReactNode } from 'react';
export interface ComplianceModuleData {
	bizindustrycategory: string;
	businessemail: string;
	businessphone: string;
	tradingname: string;
	country?: string;
	docuploaded: number;
	isapproved?: boolean;
	merchantaccounttype?: string;
	merchantcode: string;
	status?: string;
	createdAt: string;
	action?: ReactNode;
	merchantid?: number
}

export const ColumnComplianceModule = [
	{
		Header: 'Bizindustry category',
		accessor: 'bizindustrycategory',
	},
	{
		Header: 'Email',
		accessor: 'businessemail',
	},
	{
		Header: 'Phone',
		accessor: 'businessphone',
	},
	{
		Header: 'Trading name',
		accessor: 'tradingname',
	},
	// {
	// 	Header: 'Business Type',
	// 	accessor: 'merchantaccounttype',
	// },
	// {
	// 	Header: 'Country',
	// 	accessor: 'country',
	// },
	{
		Header: 'Merchant code',
		accessor: 'merchantcode',
	},
	// {
	// 	Header: 'Approved',
	// 	accessor: 'isapproved',
	// },
	{
		Header: 'Doc uploaded',
		accessor: 'docuploaded',
	},
	// {
	// 	Header: 'Status',
	// 	accessor: 'status',
	// },

	{
		Header: 'Date',
		accessor: 'createdAt',
	},
];



export interface ComplianceLimitModuleData {
	businessemail: string;
	activity: string;
	tradingname: string;
	transactiontype: string;
	limittype: string;
	paymentmethod: string;
	minlimit: number;
	maxlimit: number;
	merchantcode: string;
	status?: string;
	createdAt: string;
	action?: ReactNode;
	id?: number;
}

export const ColumnComplianceLimitModule = [

	{
		Header: 'Email',
		accessor: 'businessemail',
	},
	{
		Header: 'Activity',
		accessor: 'activity',
	},
	{
		Header: 'Transaction type',
		accessor: 'transactiontype',
	},
	{
		Header: 'Trading name',
		accessor: 'tradingname',
	},
	{
		Header: 'Min. limit',
		accessor: 'minlimit',
	},
	{
		Header: 'Max. limit',
		accessor: 'maxlimit',
	},
	{
		Header: 'Merchant code',
		accessor: 'merchantcode',
	},
	{
		Header: 'Payment method',
		accessor: 'paymentmethod',
	},
	{
		Header: 'limit type',
		accessor: 'limittype',
	},
	{

		Header: 'Action',
		accessor: 'action',

	},
	{
		Header: 'Date',
		accessor: 'createdAt',
	},
];


export interface ComplianceFeeModuleData {
	businessemail: string;
	activity: string;
	tradingname: string;
	transactiontype?: string;
	feesetting: string;
	paymentmethod: string;
	feecap: number;
	feemin: number;
	merchantcode: string;
	status: string;
	createdAt: string;
	action?: ReactNode;
	id?: number;
}

export const ColumnComplianceFeeModule = [

	{
		Header: 'Email',
		accessor: 'businessemail',
	},
	{
		Header: 'Activity',
		accessor: 'activity',
	},

	{
		Header: 'Trading name',
		accessor: 'tradingname',
	},
	{
		Header: 'Feecap',
		accessor: 'feecap',
	},
	{
		Header: 'fee min',
		accessor: 'feemin',
	},
	{
		Header: 'Merchant code',
		accessor: 'merchantcode',
	},
	{
		Header: 'Payment method',
		accessor: 'paymentmethod',
	},
	{
		Header: 'Fee settings',
		accessor: 'feesetting',
	},
	{
		Header: 'Status',
		accessor: 'status',
	},
	{
		Header: 'Action',
		accessor: 'action',
	},
	{
		Header: 'Date',
		accessor: 'createdAt',
	},
];

export interface ComplianceScheduleModuleData {
	id: string;
	businessemail: string;
	activity: string;
	tradingname: string;
	transactiontype: string;
	paymentmethod: string;
	timeapproved: string;
	periodsetting: string;
	merchantcode: string;
	status?: string;
	createdAt: string;
	action?: ReactNode;

}

export const ColumnComplianceScheduleModule = [

	{
		Header: 'ID',
		accessor: 'id',
	},

	{
		Header: 'Email',
		accessor: 'businessemail',
	},
	{
		Header: 'Activity',
		accessor: 'activity',
	},

	{
		Header: 'Trading name',
		accessor: 'tradingname',
	},
	{
		Header: 'Time approved',
		accessor: 'timeapproved',
	},
	{
		Header: 'Period setting',
		accessor: 'periodsetting',
	},
	{
		Header: 'Merchant code',
		accessor: 'merchantcode',
	},

	{
		Header: 'Action',
		accessor: 'action',
	},
	{
		Header: 'Date',
		accessor: 'createdAt',
	},
];

export interface ComplianceConfigModuleData {
	id: string;
	businessemail: string;
	activity: string;
	tradingname: string;
	transactiontype: string;
	paymentmethod: string;
	timeapproved: string;
	enablerollingreserve: string;
	rollingreserveperiod: number;
	merchantcode: string;
	status?: string;
	createdAt: string;
	action?: ReactNode
}

export const ColumnComplianceConfigModule = [

	{
		Header: 'ID',
		accessor: 'id',
	},

	{
		Header: 'Email',
		accessor: 'businessemail',
	},
	{
		Header: 'Activity',
		accessor: 'activity',
	},

	{
		Header: 'Trading name',
		accessor: 'tradingname',
	},
	{
		Header: 'Time approved',
		accessor: 'timeapproved',
	},
	{
		Header: 'Enable rolling',
		accessor: 'enablerollingreserve',
	},
	{
		Header: 'Rollingreserve period',
		accessor: 'rollingreserveperiod',
	},
	{
		Header: 'Merchant code',
		accessor: 'merchantcode',
	},

	{
		Header: 'Action',
		accessor: 'action',
	},
	{
		Header: 'Date',
		accessor: 'createdAt',
	},
];
