import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import {
	Paper,
	TableRow,
	TableHead,
	TableContainer,
	TablePagination,
	Table,
	TableBody,
	TableCell,
} from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		width: '100%',
		backgroundColor: '#FBFEFD !important',
	},
	container: {
		maxHeight: '70vh',
		maxWidth: '100%',
		backgroundColor: '#FBFEFD !important',
	},
});

export default function OperantTable({
	columns,
	rows,
	totalRows,
	changePage,
	limit,
	setDataValue,
	setOpen,
	reset = false,
}: {
	columns: any[];
	rows: any[];
	totalRows: number;
	limit: (rowsPerPage: number) => void;
	changePage: (pageNumber: number) => void;
	setDataValue?: React.Dispatch<React.SetStateAction<string | number>>;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	reset?: boolean;
}) {
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [rowsPerPageOptions, setRowsPerPageOptions] = useState<number[]>([]);

	const dispatch = useDispatch();

	const handleClick = (event: any) => {
		setDataValue && setDataValue(event.target.getAttribute('data-value'));
		setOpen && setOpen(true);
		// dispatch(saveOpen(true));
	};

	// made table and pagination dynamic so that any other component can call and use it
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

	const handleChangePage = (event: unknown, newPage: number = 0) => {
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
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map((column, index) => (
								<TableCell
									key={index}
									align={column.align}
									style={{ minWidth: column.minWidth }}>
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
												onClick={handleClick}
												data-value={
													row.reference ||
													row.actionid ||
													row.uploaduniquereference ||
													row.id
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
