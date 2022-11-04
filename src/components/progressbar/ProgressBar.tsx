import React from 'react';
import styles from './ProgressBar.module.scss';
import ProgressBar from '@ramonak/react-progress-bar';

interface progressTypes {
	chargetype: string;
	percent: number;
}

function PBar({
	data,
	title,
	color,
}: {
	data: progressTypes[] | undefined;
	title: string;
	color: string;
}) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<h3 className={styles.headerh3}>{title}</h3>
			</div>
			<div className={styles.content}>
				{data?.map(
					(
						{ chargetype, percent }: { chargetype: string; percent: number },
						i
					) => (
						<div className={styles.progress} key={i}>
							<p className={styles.progress_p}>{chargetype}</p>
							<ProgressBar
								bgColor={color}
								completed={percent}
								maxCompleted={100}
								height='22px'
								labelColor='#000000'
								borderRadius='0px'
								baseBgColor='#ffffff'
								labelSize='12px'
							/>
						</div>
					)
				)}
			</div>
		</div>
	);
}

export default PBar;
