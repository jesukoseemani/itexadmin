import { ReactNode } from "react";

export interface PaymentModuleData {
    id: string;
    email: string;
    amount: number | string;
    tradingname: string;
    merchantaccountid: number;
    fullname: string;
    firstname?: string;
    paymentreference?: string;
    linkName?: string;
    merchantreference: string;
    linkType: string;
    description: string;
    status: string;
    pageImage: ReactNode;
    donationWebsite: string;
    donationContact: string;
    isDeleted?: string;
    deletedAt?: string;
    date?: string;
    action?: ReactNode

}



export const ColumnPaymentModule = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'payment ref',
        accessor: 'paymentreference',
    },
    {
        Header: 'Link Name',
        accessor: 'linkName',
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
        Header: 'Action',
        accessor: 'action',
    },

    {
        Header: 'merchant acctid',
        accessor: 'merchantaccountid',
    },
    {
        Header: 'Link Type',
        accessor: 'linkType',
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Description',
        accessor: 'description',
    },

    {
        Header: 'Page Image',
        accessor: 'pageImage',
    },
    {
        Header: 'Donation Website',
        accessor: 'donationWebsite',
    },
    {
        Header: 'DonationContact',
        accessor: 'donationContact',
    },
    {
        Header: 'isDeleted',
        accessor: 'isDeleted',
    },
    {
        Header: 'DeletedAt',
        accessor: 'deletedAt',
    },
    {
        Header: 'Date',
        accessor: 'date',
    },


];



export interface PaymentTransModuleData {
    id: string;
    linkingreference?: string;
    merchantreference?: string;
    reference?: string;
    authoption?: string;
    amount?: string | number;
    chargeamount?: number;
    fee?: number;
    country?: string;
    chargetype?: string;
    route?: boolean;
    timein?: string;
    cardtype?: string;
    issuer?: null;
    mask?: string;
    paymentid?: string;
    responsecode?: number;
    responsemessage?: string;
    rrn?: boolean;
    paylocationtype?: boolean;
    paylocationcountry?: boolean;
    paymentlinkreference?: string;
}


export const ColumnPaymentInvoiceTransModule = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Linking ref',
        accessor: 'linkingreference',
    },
    {
        Header: 'Merchant ref',
        accessor: 'merchantreference',
    },
    {
        Header: 'Reference',
        accessor: 'reference',
    },
    {
        Header: 'Authoption',
        accessor: 'authoption',
    },
    {
        Header: 'Amount',
        accessor: 'amount',
    },
    {
        Header: 'Charge amt',
        accessor: 'chargeamount',
    },
    {
        Header: 'Fee',
        accessor: 'fee',
    },
    {
        Header: 'Country',
        accessor: 'country',
    },
    {
        Header: 'Chargetype',
        accessor: 'chargetype',
    },
    {
        Header: 'route',
        accessor: 'route',
    },
    {
        Header: 'Timein',
        accessor: 'timein',
    },

    {
        Header: 'Cardtype',
        accessor: 'cardtype',
    },
    {
        Header: 'Issuer',
        accessor: 'issuer',
    },
    {
        Header: 'Mask',
        accessor: 'mask',
    },
    {
        Header: 'Paymentid',
        accessor: 'paymentid',
    },
    {
        Header: 'Response message',
        accessor: 'responsemessage',
    },
    {
        Header: 'Rrn',
        accessor: 'rrn',
    },
    {
        Header: 'Paylocationtype',
        accessor: 'paylocationtype',
    },
    {
        Header: 'Paylocation country',
        accessor: 'paylocationcountry',
    },
    {
        Header: 'Paymentlink reference',
        accessor: 'payment linkreference',
    },


];
export interface PaymentInvoceModuleData {
    id: string;
    email: string;
    amount: number | string;
    merchantaccountid: number;
    tradingname: string;
    businessemail?: string;
    merchantcode?: number;
    userId?: number;
    fullname: string;
    lastname?: string;
    identifier: string;
    firstname?: string;
    customerId?: number;
    paymentreference?: string;
    customeremail?: string;
    action?: ReactNode;
    invoiceName?: string;
    comment: string;
    dueDate?: string;
    businesslogo: ReactNode;
    tax: string;
    status: string;
    discount: number;

    date?: string;


}



export const ColumnPaymentInvoiceModule = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Payment ref.',
        accessor: 'paymentreference',
    },
    {
        Header: 'invoice Name',
        accessor: 'invoiceName',
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
        Header: 'Identifier',
        accessor: 'identifier',
    },
    {
        Header: 'merchant acctid',
        accessor: 'merchantaccountid',
    },
    {
        Header: 'Action',
        accessor: 'action',
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Comment',
        accessor: 'comment',
    },

    {
        Header: 'Business logo',
        accessor: 'businesslogo',
    },

    {
        Header: 'Due Date',
        accessor: 'dueDate',
    },
    {
        Header: 'Tax',
        accessor: 'tax',
    },
    {
        Header: 'Discount',
        accessor: 'discount',
    },

    {
        Header: 'Date',
        accessor: 'date',
    },


];
