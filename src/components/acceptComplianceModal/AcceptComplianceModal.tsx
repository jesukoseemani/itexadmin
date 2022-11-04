import styles from './AcceptComplianceModal.module.scss';
import { Divider } from '@material-ui/core';

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

function AcceptComplianceModal({ urlId }: IUrld): JSX.Element {
	const dispatch = useDispatch();

	const approvalHandler = () => {
		dispatch(openLoader());

		axios
			.post(
				`/admin/business/compliance?merchantcode=${urlId}`,
				{
					compliancestatus: 'APPROVED',
					businessstatus: 'LIVE',
					reason: 'Satisfactorily reviewed',
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
		<div className={styles.unflagmodalContainer}>
			<div className={styles.modalColumn}>
				<div className={styles.modalHeader}>
					<div>
						<span>Accept compliance request</span>
					</div>
				</div>
				<Divider />
				<div className={styles.textDiv}>
					<p>
						Accepting this request means the Account goes live, merchant can
						accept settlements and process transfers.
					</p>
					<p className={styles.mt1}>
						Do you still want to complete the process?
					</p>

					<button
						onClick={approvalHandler}
						className={styles.buttonMargin}
						style={{
							backgroundColor: '#27AE60',
							padding: '0.7rem',
							width: '100%',
							color: '#fff',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
						}}
						type='submit'
						color='primary'>
						Accept
					</button>
				</div>
			</div>
		</div>
	);
}

export default AcceptComplianceModal;
