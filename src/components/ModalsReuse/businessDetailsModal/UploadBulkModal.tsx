import React, { useState } from 'react';
import { Divider } from '@material-ui/core';
import styles from './BusinessStyle.module.scss';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { closeModal } from '../../../redux/actions/modal/modalActions';

function UploadBulkModal() {
	const [docs, setDocs] = useState('');
	const [active, setActive] = useState(true);
	const history = useHistory();
	const dispatch = useDispatch();
	const changeHandler = (e: any) => {
		setDocs(e.target.value);
		setActive(false);
	};

	const continueHandler = () => {
		dispatch(closeModal());
	};
	return (
		<div className={styles.legalChargeRequest}>
			<h3 className={styles.terminal_h1}>Document Upload</h3>
			<Divider />

			<div className={styles.legal_wrapper}>
				<div className={styles.legal_input_wrapper}>
					<p className={styles.legal_p}>Document name</p>
					<input
						type='text'
						className={styles.legal_input}
						placeholder='Type subject'
					/>
				</div>
				<div className={styles.legal_input_wrapper}>
					<p className={styles.legal_p}>Merchant</p>
					<input
						type='text'
						className={styles.legal_input}
						placeholder='Merchant ID'
					/>
				</div>

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

			<div className={styles.legal_wrapper_flex}>
				<button className={styles.legal_button_cancel}>Cancel</button>
				<button
					className={styles.legal_button}
					disabled={active}
					onClick={continueHandler}>
					Upload
				</button>
			</div>
		</div>
	);
}

export default UploadBulkModal;
