import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	closeLoader,
	openLoader,
} from '../../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import styles from './PaymentMethod.module.scss';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import {
	closeModal,
	openModalAndSetContent,
} from '../../../redux/actions/modal/modalActions';
import { InputLabel, TextField } from '@material-ui/core';

const label = { inputProps: { 'aria-label': 'Size switch demo' } };

const GreenSwitch = styled(Switch)(({ theme }) => ({
	'& .MuiSwitch-switchBase.Mui-checked': {
		color: '#27ae60',
		'&:hover': {
			backgroundColor: alpha('#000000', theme.palette.action.hoverOpacity),
		},
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: '#828b86',
	},
}));

interface inputType {
	status: boolean;
	edit: boolean;
	otp: string;
}

function PaymentMethod({ id }: { id: string | number }) {
	const dispatch = useDispatch();
	const [payment, setPayment] = useState<any>();
	const [otp, setOtp] = useState('');
	const [status, setStatus] = useState(false);
	const [edit, setEdit] = useState(false);

	const fetchPayment = async () => {
		dispatch(openLoader());
		try {
			const { data } = await axios.get(`/v1/business/${id}/paymentMethod`);
			setPayment(data);
			dispatch(closeLoader());
		} catch (error: any) {
			dispatch(closeLoader());
			const { message } = error.response.data;
			dispatch(
				dispatch(
					openToastAndSetContent({
						toastContent: message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				)
			);
		}
	};

	useEffect(() => {
		fetchPayment();
	}, []);

	const BoxComponent = ({ identifier }: any) => {
		return (
			<div className={styles.outerbox}>
				<div className={styles.innerbox}>
					<h1 style={{ color: 'black' }}>Status:</h1>
					<p>
						<GreenSwitch
							value={identifier.status}
							defaultChecked={identifier.status}
							name='status'
							{...label}
							size='small'
							onChange={(e) => setStatus(e.target.checked)}
						/>
					</p>
				</div>
				<div className={styles.innerbox}>
					<h1 style={{ color: 'black' }}>Is Editable:</h1>
					<p>
						<GreenSwitch
							value={identifier.edit}
							defaultChecked={identifier.edit}
							name='edit'
							{...label}
							size='small'
							onChange={(e) => setEdit(e.target.checked)}
						/>
					</p>
				</div>
				<div style={{ marginTop: '20px' }}>
					<TextField
						style={{ width: '100%' }}
						id='outlined-basic'
						label='Otp'
						variant='outlined'
						placeholder='Enter your otp'
						onChange={(e) => setOtp(e.target.value)}
					/>
				</div>

				<button
					onClick={() =>
						handleChange(
							identifier.merchantaccountmethodid,
							identifier.paymentmethod,
							identifier.merchantaccountid
						)
					}
					style={{
						backgroundColor: '#27AE60',
						fontFamily: 'Roboto',
						fontStyle: 'normal',
						fontWeight: 'bold',
						fontSize: '16px',
						lineHeight: '19px',
						textAlign: 'center',
						border: 'none',
						outline: 'none',
						width: '100%',
						color: '#FFFFFF',
						padding: '13.39px 0',
						borderRadius: '4px',
						marginTop: '30px',
						cursor: 'pointer',
					}}>
					Apply changes
				</button>
			</div>
		);
	};

	const editConfigHandler = (identifier: any) => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className={styles.modalDiv}>
						<BoxComponent identifier={identifier} />
					</div>
				),
			})
		);
	};

	const handleChange = (
		id: number,
		paymentmethod: string,
		merchantId: number
	) => {
		dispatch(openLoader());

		const newObject = {
			methods: [
				{
					id,
					paymentmethod,
					status,
					iseditable: edit,
				},
			],
			otp,
		};

			axios
				.post(`/v1/business/${merchantId}/paymentMethod/modify`, newObject)
				.then((res: any) => {
					dispatch(closeLoader());
					dispatch(closeModal());

					dispatch(
						openToastAndSetContent({
							toastContent: res.data.message,
							toastStyles: {
								backgroundColor: 'green',
							},
						})
					);
				})
				.catch((err) => {
					dispatch(closeLoader());
					dispatch(
						openToastAndSetContent({
							toastContent: err.data.message,
							toastStyles: {
								backgroundColor: 'red',
							},
						})
					);
				});
	};
	return (
		<div className={styles.wrapper}>
			{payment?.paymentMethods?.map((item: any) => (
				<div
					onClick={() => editConfigHandler(item)}
					className={styles.outerbox}>
					<div className={styles.innerbox}>
						<h1>Account Id:</h1>
						<p>{item.merchantaccountid}</p>
					</div>
					<div className={styles.innerbox}>
						<h1>Method Id:</h1>
						<p>{item.merchantaccountmethodid}</p>
					</div>
					<div className={styles.innerbox}>
						<h1>Payment Method:</h1>
						<p>{item.paymentmethod}</p>
					</div>

					<div className={styles.innerbox}>
						<h1>Status:</h1>
						<p style={{ cursor: 'not-allowed' }}>
							<GreenSwitch
								{...label}
								checked={item.status ? true : false}
								size='small'
								value={item.status}
							/>
						</p>
					</div>
					<div className={styles.innerbox}>
						<h1>Is Editable:</h1>
						<p style={{ cursor: 'not-allowed' }}>
							<GreenSwitch
								{...label}
								checked={item.iseditable ? true : false}
								size='small'
								value={item.iseditable}
							/>
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

export default PaymentMethod;
