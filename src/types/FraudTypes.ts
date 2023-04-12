import { ReactNode } from 'react';
export interface FraudModuleData {
    id: string;
    email: string;
    flag: string;
    activity: string;
    firstname?: string;
    lastname?: string;
    priority: string;
    masked: string;
    bin: string;
    last4: string;
    paymentid: string;
    identifier: string;
    tradingname: string;
    merchantaccountid: number;
    merchantcode: string;
    date: string;
    action?: ReactNode;

}



export const ColumnFraudModule = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Paymentid',
        accessor: 'paymentid',
    },
    {
        Header: 'Flag',
        accessor: 'flag',
    },
    {
        Header: 'Business email',
        accessor: 'email',
    },
    {
        Header: 'Trading name',
        accessor: 'tradingname',
    },
    {
        Header: 'Activity',
        accessor: 'activity',
    },
    {
        Header: 'Priority',
        accessor: 'priority',
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
        Header: 'Masked',
        accessor: 'masked',
    },
    {
        Header: 'Bin',
        accessor: 'bin',
    },
    {
        Header: 'Last4',
        accessor: 'last4',
    },

    {
        Header: 'Action',
        accessor: 'action',
    },

    {
        Header: 'Date',
        accessor: 'date',
    },
];
export interface HotlistModuleData {
    id: string;
    masked: string;
    bin: string;
    last4: string;
    reason: string;
    status?: ReactNode;
    date: string;

}



export const ColumnHotlistModule = [
    {
        Header: 'ID',
        accessor: 'id',
    },


    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Reason',
        accessor: 'reason',
    },
    {
        Header: 'Masked',
        accessor: 'masked',
    },
    {
        Header: 'Bin',
        accessor: 'bin',
    },
    {
        Header: 'Last4',
        accessor: 'last4',
    },


    {
        Header: 'Date',
        accessor: 'date',
    },
];
