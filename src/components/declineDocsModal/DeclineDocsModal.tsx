import React, { useState } from 'react';
import styles from './DeclineDocsModal.module.scss';
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
import StatusModal from '../statusModal/StatusModal';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';

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

function DeclineDocsModal({ ident }: { ident: string }) {
	const [value, setValue] = useState('');

	const classes = useStyles();

	const dispatch = useDispatch();

	const statusHandler = (ident: string) => {
		dispatch(closeModal());

		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<>
						<StatusModal ident={ident} />
					</>
				),
			})
		);
	};

	const approvalHandler = (status: string) => {
		statusHandler(status);
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
	};

	return (
		<div className={styles.modalContainer}>
			<div className={styles.modalColumn}>
				<div className={styles.modalHeader}>
					<div>
						<span>Add a Comment</span>
					</div>
				</div>
				<Divider />
				<div className={styles.modalBody}>
					<div>
						<p className={styles.selectinputp}>Add Comment*</p>

						<input
							type='text'
							placeholder='Give a reason'
							className={styles.inputReason}
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					</div>
					<div className={styles.buttonContainer}>
						{ident === 'decline' ? (
							<button
								disabled={value.length <= 0 ? true : false}
								onClick={() => approvalHandler('decline')}
								className={styles.buttonMargin}
								style={{
									backgroundColor: '#EB5757',
									padding: '0.7rem',
									width: '100%',

									border: 'none',
									borderRadius: '10px',
								}}
								type='submit'
								color='primary'>
								Decline Document
							</button>
						) : (
							<button
								onClick={() => approvalHandler('approved')}
								disabled={value.length <= 0 ? true : false}
								className={styles.buttonMargin}
								style={{
									backgroundColor: '#219653',
									padding: '0.7rem',
									width: '100%',

									border: 'none',
									borderRadius: '10px',
								}}
								type='submit'
								color='primary'>
								Approve Document
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DeclineDocsModal;
