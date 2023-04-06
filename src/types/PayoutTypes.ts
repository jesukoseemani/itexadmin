import { ReactNode } from 'react';
export interface PayoutModuleData {
    id: string;
    email: string;
    amount: number | string;
    country: string;
    fullname: string;
    firstname?: string;
    linkingreference?: string;
    merchantreference: string;
    network: string;
    processorreference: string;
    recipientaccountnumber: string;
    recipientbankcode: string;
    transfertype: string;
    tradingname: string;
    merchantaccountid: number;
    timein: string;
    timeout?: string;
    date?: string;
    responsemessage?: string;
    recipientname?: string;
    responsecode?: string;

}



export const ColumnPayoutModule = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Linking ref',
        accessor: 'linkingreference',
    },
    {
        Header: 'Country',
        accessor: 'country',
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
        Header: 'Amount',
        accessor: 'amount',
    },
    {
        Header: 'Full name',
        accessor: 'fullname',
    },
    {
        Header: 'Processor ref',
        accessor: 'processorreference',
    },
    {
        Header: 'merchant acctid',
        accessor: 'merchantaccountid',
    },
    {
        Header: 'Recipient acct no',
        accessor: 'recipientaccountnumber',
    },
    {
        Header: 'Recipient bankcode',
        accessor: 'recipientbankcode',
    },
    {
        Header: 'Transfer type',
        accessor: 'transfertype',
    },

    {
        Header: 'Timein',
        accessor: 'timein',
    },
    {
        Header: 'Timeout',
        accessor: 'timeout',
    },


];
