import React, { useState } from 'react';
import { Divider } from '@material-ui/core';
import styles from './BusinessStyle.module.scss';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { closeModal } from '../../../redux/actions/modal/modalActions';

function BulkChargeRequest({
	setGotopage,
}: {
	setGotopage?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [docs, setDocs] = useState('');
	const [active, setActive] = useState(true);
	const history = useHistory();
	const dispatch = useDispatch();
	const changeHandler = (e: any) => {
		setDocs(e.target.value);
		setActive(false);
	};

	const continueHandler = () => {
		// setGotopage(true);
		dispatch(closeModal());
	};
	return (
		<div className={styles.bulkChargeRequest}>
			<h3 className={styles.terminal_h1}>Bulk Chargeback</h3>
			<Divider />

			<div className={styles.bulk_wrapper}>
				<h3 className={styles.bulk_h1}>File Upload requirement</h3>
				<p className={styles.bulk_p}>Files must be CSV</p>
				<p className={styles.bulk_p}>
					CSV file should contain{' '}
					<strong>
						{' '}
						transaction reference, provider, chargeback stage, chargeback type,
						chargeback amount,
					</strong>{' '}
					and <strong>reason for chargeback columns.</strong>
				</p>
				<p className={styles.bulk_p}>
					The order of the columns should be the same as the order in which they
					are listed above with the first row header.
				</p>
			</div>
			<Divider />
			<div className={styles.bulk_wrapper}>
				<p className={styles.bulk_p}>Bulk chargeback CSV file</p>

				<div className={styles.fileupload_wrapper}>
					<input
						className={styles.input_file}
						type='file'
						name='file'
						id='file'
						value={docs}
						onChange={changeHandler}
					/>
					<div className={styles.fileupload_icon}>
						<CloudUploadIcon
							sx={{
								width: '20px',
								height: '13.33px',
								color: ' #4F4F4F',
								margin: '0px 20px',
							}}
						/>
					</div>
					<div>
						<p className={styles.fileupload_para}>
							{' '}
							{docs === '' ? 'Choose file to upload' : docs}{' '}
						</p>
					</div>
				</div>
			</div>
			<div className={styles.bulk_wrapper}>
				<button
					className={styles.bulk_button}
					disabled={active}
					onClick={continueHandler}>
					Continue
				</button>
			</div>
		</div>
	);
}

export default BulkChargeRequest;
