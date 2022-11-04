import React, {useState, useEffect} from 'react';
import { Divider } from '@material-ui/core';
import styles from './BusinessStyle.module.scss';
import { useDispatch } from 'react-redux';
import DeclineTerminalRequest from './DeclineTerminalRequest';
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import ProceedTerminalRequest from './ProceedTerminalRequest';
import axios from 'axios';



interface dataTypes {
	id: number;
	terminal_id: string;
	bank_name: string;
	model: string;
	serial_number: number;
	date: string;
	status: string;
}
function RequestTerminal() {
	const dispatch = useDispatch();
	const [apiRes, setApiRes] = useState<dataTypes[]>([]);

	useEffect(() => {
		axios
			.get<dataTypes[]>(`/axiosCall/pospopup.json`, { baseURL: '' })
			.then((res) => {
				setApiRes(res.data);
			});
	}, []);

	const declineHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<>
						<DeclineTerminalRequest />
					</>
				),
			})
		);
	};

	const proceedHandler = () => {
		if(apiRes) dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<>
						<ProceedTerminalRequest apiRes={apiRes}/>
					</>
				),
			})
		);
	};
	return (
		<div className={styles.terminal_header}>
			<h1 className={styles.terminal_h1}>New Terminal Request</h1>
			<Divider />
			<div className={styles.content_wrapper}>
				<div className={styles.content_wrapper_left}>
					<h6 className={styles.content_h6}>Business name</h6>
					<p className={styles.content_p}>James Haliday</p>
				</div>
				<div className={styles.content_wrapper_right}>
					<h6 className={styles.content_h6}>Date requested</h6>
					<p className={styles.content_p}>12/12/2020</p>
				</div>
			</div>
			<div className={styles.content_wrapper_2}>
				<div className={styles.content_wrapper_left}>
					<h6 className={styles.content_h6}>Daily sales estimate</h6>
					<p className={styles.content_p}>87,654</p>
				</div>
				<div className={styles.content_wrapper_right}>
					<h6 className={styles.content_h6}>Average monthly revenue</h6>
					<p className={styles.content_p}>NGN 234,567.89</p>
				</div>
			</div>
			<div className={styles.content_wrapper_2}>
				<div className={styles.content_wrapper_left}>
					<h6 className={styles.content_h6}>Delivery</h6>
					<p className={styles.content_p}>
						34 James south Haliday street, Lagos, Nigeria
					</p>
				</div>
			</div>
			<div className={styles.button_request_wrapper}>
				<button
					className={styles.button_request_decline}
					onClick={declineHandler}>
					Decline
				</button>
				<button
					onClick={proceedHandler}
					className={styles.button_request_approve}>
					Approve
				</button>
			</div>
		</div>
	);
}

export default RequestTerminal;
