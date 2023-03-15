import styles from './FraudRiskManagement.module.scss';
import { useState, useEffect, useCallback } from 'react';
import ActivityTypes from '../../types/ActivityTypes';
import { useDispatch, useSelector } from 'react-redux';
import OperantTable from '../../components/table/OperantTable';
import axios from 'axios';
import NavBar from '../../components/navbar/NavBar';
import * as React from 'react';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useHistory } from 'react-router-dom';
import FilterModal from '../../components/filterConfig/FilterModal';
import { ReactComponent as DownloadIcon } from '../../assets/images/downloadnew.svg';

interface dataTypes {
	id: string;
	merchant_id: string;
	merchant_name: string;
	volume: number;
	value: string;
	account: string;
}

const Sales = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const [rows, setRows] = useState<ActivityTypes[]>([]);
	const [apiRes, setApiRes] = useState<dataTypes[]>();
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
		5
	);

	const [totalRows, setTotalRows] = useState<number>(0);

	const [dataValue, setDataValue] = useState<number | string>(0);

	const [open, setOpen] = useState<boolean>(false);

	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

	const history = useHistory();

	const changePage = (value: number) => {
		setPageNumber(value);
	};

	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

	useEffect(() => {
		axios
			.get<dataTypes[]>(`/axiosCall/fraudMgt_sales.json`, { baseURL: '' })
			.then((res) => {
				setApiRes(res.data);
			});
	}, []);

	useEffect(() => {
		setTotalRows(Number(apiRes?.length));
	}, [apiRes, rows]);

	interface Column {
		id: 'id' | 'merchant_id' | 'merchant_name' | 'volume' | 'value' | 'account';
		label: string;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'merchant_id', label: 'Merchant ID', minWidth: 100 },
		{ id: 'merchant_name', label: 'Merchant name', minWidth: 100 },
		{ id: 'volume', label: 'Volume', minWidth: 100 },
		{ id: 'value', label: 'Value', minWidth: 100 },
		{ id: 'account', label: 'Bank name', minWidth: 100 },
	];
	const TransactionRowTab = useCallback(
		(
			id: number | string,
			merchant_id: string,
			merchant_name: string,
			volume: string | number,
			value: string | number,
			account: string | number
		) => ({
			id: id,
			merchant_id: merchant_id,
			merchant_name: merchant_name,
			volume: volume,
			value: value,
			account: account,
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes?.map((each: any) =>
				newRowOptions.push(
					TransactionRowTab(
						each.id,
						each.merchant_id,
						each.merchant_name,
						each.volume,
						each.value,
						each.account
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, TransactionRowTab]);

	const dispatch = useDispatch();

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				marginTop: '20px',
			}}>
			<Box sx={{ width: 'auto', margin: '1rem' }}>
				
				<div className={styles.tableHeader}>
					<div className={styles.tableHeaderLeft}>
						<p className={styles.titleHead}>
							{apiRes?.length} Sales Volume & Value
						</p>
					</div>
					<div className={styles.tableHeaderRight}>
						<div className={styles.buttonDiv}>
							<button
								className={styles.button1}
								onClick={() => setIsFilterModalOpen(true)}>
								<span className={styles.buttonSpan}>
									Download&nbsp;&nbsp;
									<DownloadIcon />
								</span>
							</button>

							<button
								className={styles.button1}
								onClick={() => setIsFilterModalOpen(true)}>
								<span className={styles.buttonSpan}>
									Filter
									<ArrowDropDownIcon />
								</span>
							</button>
						</div>
					</div>
				</div>
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
			</Box>
		</div>
	);
};

export default Sales;
