import React, { useMemo, useEffect, useState } from 'react';
import styles from './Paginated.module.scss';
import FundIcon from '../../../assets/images/funded.svg';
import {
	useTable,
	useSortBy,
	useFilters,
	usePagination,
	useGlobalFilter,
	useAsyncDebounce,
	useRowSelect,
	Column,
} from 'react-table';
import { ReactComponent as RightArrow } from '../../assets/images/U_next.svg';
import { ReactComponent as LeftArrowFaded } from '../../assets/images/U_previous.svg';
// import { ReactComponent as EmptyTable } from "../../assets/images/empty-table.svg";

type DataColumn = {
	data: any;
	columns: any;
	emptyPlaceHolder: string;
	recent: boolean;
	value?: string;
	clickAction?: boolean;
	total?: string | number | undefined;
	setPageNumber?: any;
	pageNumber?: any;
	nextPage?: number | null;
	previousPage?: number | null;
	setPreviousPage?: React.Dispatch<React.SetStateAction<number | null>>;
	setNextPage?: React.Dispatch<React.SetStateAction<number | null>>;
	rowsPerPage?: number;
	totalPage?: string | number | undefined;
	setRowsPerPage?: React.Dispatch<React.SetStateAction<number>>;
	setContentAction?: any;
};

const initialState = { hiddenColumns: ['id'] };

const PaginationTable = ({
	data,
	columns,
	emptyPlaceHolder,
	recent,
	value,
	clickAction = false,
	total,
	setPageNumber,
	pageNumber,
	rowsPerPage,
	nextPage,
	previousPage,
	setPreviousPage,
	setNextPage,
	totalPage,
	setRowsPerPage,
	setContentAction,
}: // clickAction,
	Partial<DataColumn>) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		canNextPage,
		canPreviousPage,
		pageOptions,
		pageCount,
		setPageSize,
		state: { pageIndex, pageSize, globalFilter },
		setGlobalFilter,
		prepareRow,
	} = useTable(
		{
			columns,
			data,
			initialState: {
				sortBy: [
					{
						id: 'columnId',
						desc: false,
					},
				],
				pageSize: rowsPerPage,
			},
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect
	);

	const [searchVal, setSearchVal] = useState(globalFilter);

	const onChangeSearch = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 1000);

	useEffect(() => {
		setGlobalFilter(value);
		console.log('Value', value);
	}, [value]);

	return (
		<div className={styles.tableWrapper}>
			<div className={styles.tableBox}>
				<table
					{...getTableProps()}
					style={{ width: '100%' }}
					className={styles.table}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										{...column.getHeaderProps(column.getSortByToggleProps())}
										className={styles.tableHead}>
										{column.render('Header')}
										<span>
											{column.isSorted
												? column.isSortedDesc
													? ' 🔽'
													: ' 🔼'
												: ''}
										</span>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()} style={{ width: '100%' }}>
						{page?.map((row) => {
							prepareRow(row);
							return (
								<tr
									{...row.getRowProps()}
									className={
										clickAction ? styles.tableBodyHover : styles.tableBody
									}
									onClick={
										clickAction
											? () => setContentAction(row.original)
											: () => null
									}>
									{row.cells.map((cell) => {
										return (
											<td
												{...cell.getCellProps()}
												style={{
													padding: '20px',
													fontFamily: 'Roboto',
													fontStyle: 'normal',
													fontWeight: 500,
													fontSize: '14px',
													lineHeight: '24px',
													letterSpacing: '-0.011em',
													color: '#424242',
													borderBottom: '1px solid #e5e5e5',
												}}>
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{data.length === 0 && (
				<div className={styles.emptyState}>
					<div className={styles.noTransaction}>{emptyPlaceHolder}</div>
					{/* <EmptyTable /> */}
				</div>
			)}

			{!recent ? (
				<>
					{' '}
					{/* Pagination */}
					{total === 0 ? null : (
						<div className={styles.paginatedSection}>
							<div>
								<div className={styles.arrowDirections}>
									<div
										onClick={() =>
											setPageNumber((prev: number) =>
												prev === 1 ? 1 : prev - 1
											)
										}
										style={{ paddingRight: '40px' }}>
										<div>
											{pageNumber === 1 ? (
												<div style={{ cursor: 'pointer' }}>
													<LeftArrowFaded />
													<span className={styles.previous}>Previous</span>
												</div>
											) : (
												<div style={{ cursor: 'pointer' }}>
													<RightArrow
														style={{
															transform: 'rotate(180deg)',
															cursor: 'pointer',
														}}
													/>
													<span className={styles.previousTrue}>Previous</span>
												</div>
											)}
										</div>
									</div>
									<span className={styles.pageNumber}>
										<span className={styles.pageIndex}>
											{pageNumber} of {totalPage}
										</span>
										{total === 0 ? null : (
											<select
												value={pageSize}
												onChange={(e) => {
													setRowsPerPage &&
														setRowsPerPage(Number(e.target.value));
													setPageSize(Number(e.target.value));
												}}
												className={styles.selection}>
												{[5, 10, 20, 30, 40, 50].reverse().map((pageSize) => (
													<option key={pageSize} value={pageSize}>
														Show {pageSize}
													</option>
												))}
											</select>
										)}
									</span>
									{pageNumber === totalPage ? (
										<div onClick={() => setPageNumber(totalPage)}>
											<div style={{ cursor: 'pointer', paddingLeft: '40px' }}>
												<span className={styles.nextFalse}>Next</span>
												<LeftArrowFaded
													style={{
														transform: 'rotate(180deg)',
														cursor: 'pointer',
													}}
												/>
											</div>
										</div>
									) : (
										<div onClick={() => setPageNumber(pageNumber + 1)}>
											<div style={{ cursor: 'pointer' }}>
												<span className={styles.next}>Next</span>
												<RightArrow />
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					)}
					{/* Pagination */}
					{/* Show items */}
					{/* Show items */}{' '}
				</>
			) : null}
		</div>
	);
};

export default PaginationTable;
