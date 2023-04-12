
export interface MarketingModuleData {
    id: Number;
    firstname?: string;
    lastname?: string;
    userId?: number;
    email?: string;
    fullname?: string;
    subject?: string;
    dateAdded?: string;
    dateSent?: string;
    date: string;

}



export const ColumnMarkettingModule = [
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
        Header: 'Subject',
        accessor: 'subject',
    },
    {
        Header: 'Date Added',
        accessor: 'dateAdded',
    },
    {
        Header: 'Date sent',
        accessor: 'dateSent',
    },

    {
        Header: 'Date',
        accessor: 'date',
    },
];
