import React, { useState, useEffect, useCallback } from 'react';
import NumberFormat from 'react-number-format';
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
	data: dashboardDataTypes[];
	title: string;
	figured: boolean;
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

	// const [apiRes, setApiRes] = useState<dashboardDataTypes[]>([]);

	// useEffect(() => {
	// 	axios
	// 		.get<dashboardDataTypes>(
	// 			`/api/v1/merchant/dashboard/metric/product/usage?limit=${rowsPerPage}&page=${pageNumber}`
	// 		)
	// 		.then((res: any) => {
	// 			setApiRes(res.data);
	// 		})
	// 		.catch((err) => console.log(err));
	// }, [rowsPerPage, pageNumber]);

	// useEffect(() => {
	// 	setTotalRows(Number(apiRes?.data?.length));
	// }, [apiRes]);

	interface Column {
		id: 'head' | 'amount';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{
			id: 'head',
			label: `${title}`,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'amount',
			label: <TableElementSymbol />,
			align: 'right',
			minWidth: 100,
		},
	];

	const LoanRowTab = useCallback(
		(
			id: number | string,
			business: string | number,
			amount: string | number
		) => ({
			head: business,
			amount: figured ? (
				<NumberFormat
					value={Number(amount)}
					displayType={'text'}
					thousandSeparator={true}
					// prefix={'₦'}
				/>
			) : (
				`${amount}%`
			),
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		data?.length !== 0 &&
			data?.map((each: any) =>
				newRowOptions.push(LoanRowTab(each.id, each.business, each.amount))
			);
		setRows(newRowOptions);
	}, [LoanRowTab]);

	return (
		<>
			{/* <OperantTable
				columns={columns}
				rows={rows}
				totalRows={totalRows}
				changePage={changePage}
				limit={limit}
			/> */}
		</>
	);
}

export default DashboardProductTable;
