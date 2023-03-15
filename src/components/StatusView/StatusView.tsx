import React from 'react';
import styles from './Statusview.module.scss';

type StatusProps = {
	status: string | undefined;
	green?: string;
	red?: string;
	orange?: string;
	blue?: string;
	value?: string;
	setValue?: React.Dispatch<React.SetStateAction<string>>;
};
const StatusView = ({
	status,
	green,
	orange,
	red,
	blue,
	value,
	setValue,
}: StatusProps) => {
	return (
		<div className={styles.wrapper}>
			{status === red ? (
				<div className={styles.declined}>{red}</div>
			) : status === orange ? (
				<div className={styles.processing}>{orange}</div>
			) : status === green ? (
				<div className={styles.completed}>{green}</div>
			) : status === blue ? (
				<div className={styles.review}>{blue}</div>
			) : null}
		</div>
	);
};

export default StatusView;
