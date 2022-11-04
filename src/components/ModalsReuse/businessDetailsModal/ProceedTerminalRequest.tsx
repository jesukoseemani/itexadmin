import React, { useMemo } from 'react';
import { useTable, useRowSelect } from 'react-table';
import { Divider } from '@material-ui/core';
import styles from './BusinessStyle.module.scss';
import TextField from '@mui/material/TextField';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { closeModal } from '../../../redux/actions/modal/modalActions';
import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import { Checkbox } from '../../../components/Checlbox';
import { makeStyles } from '@material-ui/core';
import ConfirmTerminalApproval from './ConfirmTerminalApproval';

const useStyles = makeStyles({
	root: {
		'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			border: 'none',
		},
		'& .MuiOutlinedInput-input.MuiInputBase-input.MuiInputBase-input.MuiOutlinedInput-input':
			{
				textAlign: 'center',
				padding: '8.1px 14px',
			},
	},
	select: {
		'&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			outline: 'none',
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
			backgroundColor: '#ffffff',
		},
		'& .MuiInputLabel-root.Mui-focused': {
			color: '#E0E0E0',
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			border: '1px solid #E0E0E0',
		},
	},
});

interface columnTypes {
	Header: string;
	accessor: string;
}

function ProceedTerminalRequest({ apiRes }: any) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const approveHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<>
						<ConfirmTerminalApproval />
					</>
				),
			})
		);
	};

	const COLUMNS = [
		{
			Header: '#',
			accessor: 'id',
		},
		{
			Header: 'Terminal ID',
			accessor: 'terminal_id',
		},
		{
			Header: 'Bank',
			accessor: 'bank_name',
		},
		{
			Header: 'Serial number',
			accessor: 'model',
		},
		{
			Header: 'Model',
			accessor: 'serial_number',
		},
		{
			Header: 'Date added',
			accessor: 'date',
		},
	];

	const columns: any = useMemo(() => COLUMNS, []);
	const data = useMemo(() => apiRes, []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		rows,
		prepareRow,
		// selectedFlatRows,
	} = useTable(
		{
			columns,
			data,
		},
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns:any) => [
				{
					id: 'selection',
					Header: ({ getToggleAllRowsSelectedProps }:any) => (
						<Checkbox {...getToggleAllRowsSelectedProps()} />
					),
					Cell: ({ row }:any) => <Checkbox {...row.getToggleRowSelectedProps()} />,
				},
				...columns,
			]);
		}
	);


	// console.log('selected: ', selectedFlatRows)
	return (
		<div className={styles.proceedRequest}>
			<h3 className={styles.terminal_h1}>
				Select terminal to assign to business
			</h3>
			<Divider />
			<div className={styles.content_proceed}>
				<table className={styles.table} {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup: any) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column: any) => (
									<th {...column.getHeaderProps()}>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row: any) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell: any) => {
										return (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>

				{/* <tfoot>
						{footerGroups.map((footerGroup) => (
							<tr {...footerGroup.getFooterGroupProps()}>
								{footerGroup.headers.map((column) => (
									<td {...column.getFooterProps()}>
										{column.render('Footer')}
									</td>
								))}
							</tr>
						))}
					</tfoot> */}
			</div>
			<div className={styles.button_request_wrapper}>
				<button
					onClick={() => dispatch(closeModal())}
					className={styles.button_request_decline}>
					Decline
				</button>
				<button
					onClick={approveHandler}
					className={styles.button_request_approve}>
					Proceed
				</button>
			</div>
		</div>
	);
}

export default ProceedTerminalRequest;