import React from 'react';
import Styles from './OverviewTable.module.scss';

interface propTypes {
	title: string;
	subTitle?: string;
	children?: React.ReactNode;
}

export default function OverviewTable({
	title,
	children,
	subTitle,
}: propTypes) {
	return (
		<div className={Styles.container}>
			<div className={Styles.header}>
				<div>
					<h3 className={Styles.headerh2}>{title}</h3>
					<span className={Styles.headerSpan}>{subTitle}</span>
				</div>
			</div>
			<div className={Styles.tableContent}>{children}</div>
		</div>
	);
}
