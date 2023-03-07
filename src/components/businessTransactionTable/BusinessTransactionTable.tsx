import React, { useState, useEffect, useCallback } from 'react';
import styles from './BusinessTransactionTable.module.scss';
import OperantTableItexPay from '../../components/tableItexPay/OperantTableItexPay';
import { businessTransactiontabTypes } from '../../types/UserTableTypes';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import aYAxios from '../axiosInstance';

function BusinessTransactionTable({ id }: { id: string }) {
	const [rows, setRows] = useState<any[]>([]);
	const [apiRes, setApiRes] = useState<businessTransactiontabTypes>();
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
		5
	);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [dataValue2, setDataValue2] = useState<number | string>(0);

	const [open2, setOpen2] = useState<boolean>(false);

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};


	useEffect(() => {
		aYAxios
			.get<businessTransactiontabTypes>(
				`/admin/transactions?perpage=${rowsPerPage}&page=${pageNumber}&merchantcode=${id}`
			)
			.then((res) => {
				setApiRes(res.data);
			});
	}, [rowsPerPage, pageNumber, id]);

	useEffect(() => {
		setTotalRows(Number(apiRes?._metadata.totalcount));
	}, [apiRes]);

	//ENDS FUNCTIONS

	interface Column {
		id: 'amount' | 'status' | 'customer_id' | 'payment_type' | 'date';

		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'amount', label: 'Amount', minWidth: 100 },
		{ id: 'status', label: 'Status', minWidth: 100 },
		{
			id: 'customer_id',
			label: 'Customer ID',
			align: 'center',
			minWidth: 100,
		},
		{ id: 'payment_type', label: 'Payment type', minWidth: 100 },
		{ id: 'date', label: 'Date', minWidth: 100 },
	];

	const LoanRowTab = useCallback(
		(
			id: number | string,
			amount: string,
			code: string,
			msisdn: string,
			paymentmethod: string,
			added: string
		) => ({
			amount: amount,
			status: (
				<span
					className={styles.tableSpan}
					style={{
						backgroundColor:
							(code === '00' && 'rgba(93, 204, 150, 0.17)') ||
							(code === '09' && 'rgba(247, 23, 53, 0.17)') ||
							'#F71735',
						color:
							(code === '00' && '#ffffff') ||
							(code === '09' && '#000000') ||
							'#ffffff',
					}}>
					{(code === '00' && 'Successful') ||
						(code === '09' && 'Pending') ||
						'Failed'}
				</span>
			),
			customer_id: msisdn,
			payment_type: <div style={{ paddingLeft: '20px' }}>{paymentmethod}</div>,
			date: `${format(parseISO(added), 'MM MMM yyyy')} ${format(
				parseISO(added),
				'h aaa'
			)}`,
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes?.transactions.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(
						each?.id,
						each?.order.amount,
						each?.code,
						each?.source.customer.msisdn,
						each?.transaction.paymentmethod,
						each?.transaction.added
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, LoanRowTab]);

	return (
		<>
			<OperantTableItexPay
				columns={columns}
				rows={rows}
				totalRows={totalRows}
				changePage={changePage}
				limit={limit}
				setDataValue2={setDataValue2}
				setOpen2={setOpen2}
			/>
		</>
	);
}

export default BusinessTransactionTable;
