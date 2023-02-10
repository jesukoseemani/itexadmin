import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import MuiTableCell from '@material-ui/core/TableCell';
import {
	Paper,
	TableRow,
	TableHead,
	TableContainer,
	TablePagination,
	Table,
	TableBody,
	TableCell,
} from '@mui/material';

const useStyles = makeStyles({
	root: {
		width: '100%',
		backgroundColor: '#ffffff !important',
	},
	container: {
		maxHeight: '70vh',
		width: '100% !important',
		backgroundColor: '#ffffff !important',
	},
});

// const TableCell = withStyles({
// 	root: {
// 		borderBottom: 'none',
// 	},
// })(MuiTableCell);

export default function OperantTableItexPay({
	columns,
	rows,
	totalRows,
	changePage,
	limit,
	setDataValue2,
	setOpen2,
	reset,
}: {
	columns: any[];
	rows: any[];
	totalRows: number;
	limit: (rowsPerPage: number) => void;
	changePage: (pageNumber: number) => void;
	setDataValue2?: React.Dispatch<React.SetStateAction<string | number>>;
	setOpen2?: React.Dispatch<React.SetStateAction<boolean>>;
	reset?: boolean;
}) {
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [rowsPerPageOptions, setRowsPerPageOptions] = useState<number[]>([]);
	// made table and pagination dynamic so that any other component can call and use it

	const handleClick = (event: any) => {
		setDataValue2?.(event.target.getAttribute('data-value'));
		setOpen2?.(true);
	};
	useEffect(() => {
		let number: number = 0;
		const storeArr: number[] = [];
		while (number < totalRows) {
			number += 5;
			if (number < totalRows) storeArr.push(number);
		}
		setRowsPerPageOptions(storeArr);
	}, [totalRows]);

	useEffect(() => {
		if (reset === true) {
			setPage(0);
			setRowsPerPage(10);
			changePage(1);
			setRowsPerPage(10);
			limit(10);
		}
	}, [reset]);

	useEffect(() => {
		changePage(page + 1);
		limit(rowsPerPage);
	}, [page, rowsPerPage]);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
		changePage(newPage + 1);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		limit(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: '70vh' }}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map((column, index) => (
								<TableCell
									key={index}
									align={column.align}
									style={{
										minWidth: column.minWidth,
										fontWeight: '600',
										background: '#F4F6F8',
										fontSize: '14px',
									}}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, index) => {
							return (
								<TableRow hover role='checkbox' tabIndex={-1} key={index}>
									{columns.map((column, secondIndex) => {
										const value = row[column.id];
										return (
											<TableCell
												key={secondIndex}
												align={column.align}
												style={{ borderLeft: 'none', cursor: 'pointer' }}
												onClick={handleClick}
												data-value={
													row.merchantcode || row.request_id || row.id
												}>
												{value}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={rowsPerPageOptions}
				count={totalRows}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
