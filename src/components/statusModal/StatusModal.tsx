import React, { useState } from 'react';
import styles from './statusModal.module.scss';
import { InputLabel, Divider } from '@material-ui/core';
import TextField from '@mui/material/TextField';

import { makeStyles } from '@material-ui/core';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { closeModal } from '../../redux/actions/modal/modalActions';
import Success from '../../assets/images/BigCHecked.svg';
import Failed from '../../assets/images/bigErrorChecked.svg';

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

function StatusModal({ ident }: { ident: string }) {
	const dispatch = useDispatch();

	const approvalHandler = () => {
		// dispatch(openLoader());

		// axios
		// 	.post(
		// 		`/admin/business/compliance?merchantcode=${urlId}`,
		// 		{
		// 			compliancestatus: 'DECLINED',
		// 			// businessstatus: 'LIVE',
		// 			reason: value,
		// 		}
		// 	)
		// 	.then((res: any) => {
		// 		dispatch(closeLoader());
		// 		dispatch(
		// 			openToastAndSetContent({
		// 				toastContent: res.data.message,
		// 				toastStyles: {
		// 					backgroundColor: 'green',
		// 				},
		// 			})
		// 		);
		// 		dispatch(closeModal());
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		dispatch(closeLoader());
		// 		dispatch(
		// 			openToastAndSetContent({
		// 				toastContent: err?.data?.message,
		// 				toastStyles: {
		// 					backgroundColor: 'red',
		// 				},
		// 			})
		// 		);
		// 		dispatch(closeModal());
		// 	});
		dispatch(closeModal());
	};

	return (
		<div className={styles.modalContainer}>
			<div className={styles.statusWrapper}>
				<img src={`${ident === 'approve' ? Success : Failed}`} alt='' />
				<p>
					{ident === 'approve'
						? 'Document has being Approved'
						: 'Document has Successfully Declined'}
				</p>

				<button onClick={() => dispatch(closeModal())}>Close</button>
			</div>
		</div>
	);
}

export default StatusModal;
