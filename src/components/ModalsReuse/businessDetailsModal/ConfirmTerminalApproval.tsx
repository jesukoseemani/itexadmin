import React from 'react';
import { Divider } from '@material-ui/core';
import styles from './BusinessStyle.module.scss';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/actions/modal/modalActions';

function ConfirmTerminalApproval() {
	const dispatch = useDispatch();

	const approvalHandler = () => {
		window.alert('coming soon');
	};

	return (
		<div className={styles.confirmApprovalRequest}>
			<h3 className={styles.terminal_h1}>Confirm terminals approval</h3>
			<Divider />
			<div className={styles.content_wrapper}>
				<p className={styles.content_wrapper_paragraph}>
					You are about to assign these terminals to James Haliday. Do you want
					to proceed?
				</p>
			</div>

			<div className={styles.button_request_wrapper2}>
				<button
					className={styles.button_request_decline}
					onClick={() => dispatch(closeModal())}>
					Decline
				</button>
				<button
					onClick={approvalHandler}
					className={styles.button_request_approve}>
					Approve
				</button>
			</div>
		</div>
	);
}

export default ConfirmTerminalApproval;
