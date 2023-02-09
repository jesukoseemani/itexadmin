import styles from './Settlement.module.scss';
import { useState, useEffect, useCallback } from 'react';
import ActivityTypes from '../../types/ActivityTypes';
import { useDispatch, useSelector } from 'react-redux';
import OperantTable from '../../components/table/OperantTable';
import axios from 'axios';
import * as React from 'react';
import { useHistory } from 'react-router-dom';


interface dataTypes {
	id: string;
	amount: string;
	status: string;
	business_name: number;
	destination: string;
	merchant_id: string;
	date: string;
}

const Report = () => {
	const [rows, setRows] = useState<ActivityTypes[]>([]);
	const [apiRes, setApiRes] = useState<dataTypes[]>();
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [dataValue, setDataValue] = useState<number | string>(0);
	const [selected, setSelected] = useState<any>([]);
	const [selectedId, setSelectedId] = useState<{ id: string; type: string }>({
		id: '',
		type: '',
	});
	const [open, setOpen] = useState<boolean>(false);
	const [gotopage, setGotopage] = useState<boolean>(false);

	useEffect(() => {
		if (gotopage) history.push('/settlement');
	}, [gotopage]);


	useEffect(() => {
		const { id, type } = selectedId;
		if (type === 'add') {
			if (!selected.includes(id)) {
				setSelected((prev: any) => [...prev, id]);
			}
		} else {
			const elems = selected?.filter((elem: any) => elem !== id);
			setSelected(elems);
		}
	}, [selectedId]);

	const history = useHistory();

	const dispatch = useDispatch();

	const changePage = (value: number) => {
		setPageNumber(value);
	};

	const limit = (value: number) => {
		setRowsPerPage(value);
	};



	useEffect(() => {
		if (open && dataValue !== null) {
			history.push(`/settlement_report/${dataValue}`);
		}
	}, [dataValue, open]);

	const handleReport = () => {
		history.push(`/settlements/report`);
	};

	const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

	useEffect(() => {
		axios
			.get<dataTypes[]>(`/axiosCall/settlement.json`, { baseURL: '' })
			.then((res) => {
				setApiRes(res.data);
			});
	}, []);

	useEffect(() => {
		setTotalRows(Number(apiRes?.length));
	}, [apiRes, rows]);

	interface Column {
		id:
			| 'id'
			| 'actions'
			| 'amount_due'
			| 'status'
			| 'business_name'
			| 'destination'
			| 'merchant_id'
			| 'date';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'amount_due', label: 'Amount Due', minWidth: 100 },
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'business_name', label: 'Business Name', minWidth: 100 },
		{ id: 'destination', label: 'Destination', minWidth: 100 },
		{ id: 'merchant_id', label: 'Merchant ID', minWidth: 100 },
		{ id: 'date', label: 'Transaction Date', minWidth: 100 },
	];
	const SettlementsRowTab = useCallback(
		(
			id: number | string,
			amount: string,
			status: string,
			business_name: string,
			destination: string | number,
			merchant_id: string,
			date: string
		) => ({
			id: id,
			amount_due: amount,
			status: (
				<span
					className={styles.tableSpan}
					style={{
						backgroundColor:
							(status === 'Due' && '#27AE60') ||
							(status === 'Failed' && '#EB5757') ||
							(status === 'Pending Approval' && '#F2C94C') ||
							'rgba(169, 170, 171, 0.22)',
						color:
							(status === 'Due' && '#FFFFFF') ||
							(status === 'Failed' && '#FFFFFF') ||
							(status === 'Pending Approval' && '#12122C') ||
							'#FFFFFF',
					}}>
					{status}
				</span>
			),
			business_name: business_name,
			destination: destination,
			merchant_id: merchant_id,
			date: date,
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes.map((each: any) =>
				newRowOptions.push(
					SettlementsRowTab(
						each.id,
						each.amount,
						each.status,
						each.business_name,
						each.destination,
						each.merchant_id,
						each.date
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, SettlementsRowTab]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<div className={styles.m1}>
				<OperantTable
					columns={columns}
					rows={rows}
					totalRows={totalRows}
					changePage={changePage}
					limit={limit}
					setDataValue={setDataValue}
					setOpen={setOpen}
				/>
			</div>
		</div>
	);
};

export default Report;
