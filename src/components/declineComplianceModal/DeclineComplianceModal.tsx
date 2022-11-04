import React, { useState } from 'react';
import styles from './DeclineComplianceModal.module.scss';
import { InputLabel, Divider } from '@material-ui/core';
import TextField from '@mui/material/TextField';

import { makeStyles } from '@material-ui/core';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { closeModal } from '../../redux/actions/modal/modalActions';

import { useDispatch } from 'react-redux';
import axios from 'axios';

interface IUrld {
	urlId: string;
}

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

function DeclineComplianceModal({ urlId }: IUrld) {
	const [value, setValue] = useState('');

	const classes = useStyles();

	const dispatch = useDispatch();

	const approvalHandler = () => {
		dispatch(openLoader());

		axios
			.post(
				`/admin/business/compliance?merchantcode=${urlId}`,
				{
					compliancestatus: 'DECLINED',
					// businessstatus: 'LIVE',
					reason: value,
				}
			)
			.then((res: any) => {
				dispatch(closeLoader());
				dispatch(
					openToastAndSetContent({
						toastContent: res.data.message,
						toastStyles: {
							backgroundColor: 'green',
						},
					})
				);
				dispatch(closeModal());
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());
				dispatch(
					openToastAndSetContent({
						toastContent: err?.data?.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
				dispatch(closeModal());
			});
	};

	return (
		<div className={styles.modalContainer}>
			<div className={styles.modalColumn}>
				<div className={styles.modalHeader}>
					<div>
						<span>Decline Compliance Request</span>
					</div>
				</div>
				<Divider />
				<div className={styles.modalBody}>
					<p className={styles.para}>
						You are about to decline this compliance request. Select a reason to
						inform the business why their compliance was declined.
					</p>
					<p className={styles.selectinputp}>Reason</p>

					<TextField
						id='demo-simple-select'
						value={value}
						size='small'
						className={classes.select}
						fullWidth
						onChange={(e) => setValue(e.target.value)}
					/>

					<InputLabel></InputLabel>
					<button
						onClick={approvalHandler}
						className={styles.buttonMargin}
						style={{
							backgroundColor: '#EB5757',
							padding: '0.7rem',
							width: '100%',
							color: '#fff',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
						}}
						type='submit'
						color='primary'>
						Decline
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeclineComplianceModal;
