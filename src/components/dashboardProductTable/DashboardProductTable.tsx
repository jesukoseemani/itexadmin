import React, { useState, useEffect, useCallback } from 'react';
import NumberFormat from 'react-number-format';
import OperantTable from '../table/OperantTable';
import TableElementSymbol from '../tableElement/TableElementSymbol';
// import { dashboardDataTypes } from '../../types/UserTableTypes';

interface dashboardDataTypes {
	business: string;
	amount: number;
}

function DashboardProductTable({
	data,
	title,
	figured,
}: {
	data: any[];
	title?: string;
	figured?: boolean;
}) {
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
		5
	);
	const [totalRows, setTotalRows] = useState<number>(data.length);
	const [rows, setRows] = useState<any[]>([]);

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	interface Column {
		id: 'name' | 'merchantcode' | 'transaction_amount' | 'transaction_count';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{
			id: 'name',
			label: 'name',
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'merchantcode',
			label: 'merchantcode',
			align: 'right',
			minWidth: 100,
		},
		{
			id: 'transaction_amount',
			label: 'transaction_amount',
			align: 'right',
			minWidth: 100,
		},
		{
			id: 'transaction_count',
			label: 'transaction_count',
			align: 'right',
			minWidth: 100,
		},
	];

	const LoanRowTab = useCallback(
		(
			tradingname: string,
			merchantcode: string,
			transaction_amount: number,
			transaction_count: number
		) => ({
			name: tradingname,
			merchantcode: merchantcode,
			transaction_amount: transaction_amount,
			transaction_count: transaction_count,
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		data?.length !== 0 &&
			data?.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(
						each.tradingname,
						each.merchantcode,
						each.transaction_amount,
						each.transaction_count
					)
				)
			);
		setRows(newRowOptions);
	}, [LoanRowTab, data]);

	return (
		<div style={{ height: '100%' }}>
			{data.length > 0 ? (
				<OperantTable
					columns={columns}
					rows={rows}
					totalRows={totalRows}
					changePage={changePage}
					limit={limit}
				/>
			) : (
				<p
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
						fontWeight: 'bold',
					}}>
					No Data Found
				</p>
			)}
		</div>
	);
}

export default DashboardProductTable;
