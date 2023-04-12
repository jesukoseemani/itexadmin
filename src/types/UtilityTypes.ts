import { ReactNode } from 'react';
export interface CountryModuleData {
    id: number,
    country: string;
    currencyDescription: string;
    currencyCode: number;
    currencyIso: string;
    countryIso: string;
    currencyStatus: boolean;
    countrystatus: boolean;
    dialCode: number


}
export interface CategoryModuleData {
    id: number,
    firstname?: string;
    lastname?: string;
    userId?: number;
    email?: string;
    fullname?: string;
    categoryName: string;
    categoryCode: string;
    status: string;
    date: string;
    action?: ReactNode


}

export const ColumnCategoryModule = [
    {
        Header: 'ID',
        accessor: 'id',
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
        Header: 'UserId',
        accessor: 'userId',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Fullname',
        accessor: 'fullname',
    },
    {
        Header: 'Category Name',
        accessor: 'categoryName',
    },
    {
        Header: 'Category Code',
        accessor: 'categoryCode',
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Date',
        accessor: 'date',
    },
    {
        Header: 'Action',
        accessor: 'action',
    },


];
