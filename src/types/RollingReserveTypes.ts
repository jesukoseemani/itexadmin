export interface RollingReserveModuleData {
	rolling_id: number;
	settlement_id: string;
	amount: string;
	currency: string;
	status: number;
	merchantcode:string;
	balanceBefore:string;
	balanceAfter:string;
	duedate: string;
	date: string;

}



export const ColumnSettlementRollingModule = [
	{
		Header: 'ID',
		accessor: 'rolling_id',
	},
	{
		Header: 'Settlement ID',
		accessor: 'settlement_id',
	},
	{
		Header: 'Currency',
		accessor: 'currency',
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
		Header: 'Machant code',
		accessor: 'merchantcode',
	},
	{
		Header: 'Balance before',
		accessor: 'balanceBefore',
	},
	{
		Header: 'Balance after',
		accessor: 'balanceAfter',
	},
	{
		Header: 'Due date',
		accessor: 'duedate',
	},
	{
		Header: 'Created Date',
		accessor: 'date',
	},
];


