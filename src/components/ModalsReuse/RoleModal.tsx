import React, { useState, useCallback, useMemo, useEffect } from 'react';
import styles from './BusinessModal.module.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import {
	openLoader,
	closeLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { InputLabel, TextField } from '@material-ui/core';
import Select from '../formUI/Select';
import { Divider } from '@mui/material';
import { closeModal } from '../../redux/actions/modal/modalActions';

function RoleModal({
	title,
	setBearer,
	editDetails,
	action,
	link,
}: {
	title: string;
	setBearer: React.Dispatch<React.SetStateAction<boolean>>;
	editDetails?: any;
	action?: string;
	link?: string;
}) {
	const dispatch = useDispatch();
	interface ResponseData {
		role_name: string;
		role: string;
	}

	const validate = Yup.object({
		name: Yup.string().required('Role name is required'),
		description: Yup.string().required('description is required'),
	});
	const settlementOptions = [{ name: 'Super Admin' }, { name: 'Business' }];

	const accountTypes = [
		{
			id: 1,
			title: 'All modules',
		},

		{
			id: 2,
			title: 'Transactions',
		},

		{
			id: 3,
			title: 'Businesses',
		},
		{
			id: 4,
			title: 'Wallet Management',
		},
		{
			id: 5,
			title: 'Fees & Limits',
		},
		{
			id: 6,
			title: 'Users & Permissions',
		},
		{
			id: 7,
			title: 'POS',
		},
		{
			id: 8,
			title: 'Fraud & Risk Management',
		},
		{
			id: 9,
			title: 'Legal',
		},
		{
			id: 10,
			title: 'Chargeback Management',
		},
	];

	interface pes {
		id: number;
		title: string;
	}

	const [permission, setPermission] = useState<any>({});
	const [singleData, setSingleData] = useState<any>({});
	// memoize queries to avoid rerender
	const handlePermission = (id: any, title: any) => {
		setPermission((state: pes[]) => ({
			...state, // <-- copy previous state
			[id]: !state[id], // <-- update value by index key
		}));
	};

	return (
		<div
			style={{
				color: 'rgba(0, 0, 0, 1)',
				backgroundColor: '#ffffff',
				overflowY: 'hidden',
				height: '350px',
			}}>
			<Formik
				initialValues={{
					name: editDetails?.userRoleName || '',
					description: editDetails?.roleDescription || '',
				}}
				validationSchema={validate}
				onSubmit={(values) => {
					dispatch(openLoader());

					axios
						.post(`${link}`, { ...values, action: `${action}` })
						.then((res: any) => {
							dispatch(closeLoader());
							console.log('res:', res.data);
							dispatch(
								openToastAndSetContent({
									toastContent: res?.data?.message,
									toastStyles: {
										backgroundColor: 'green',
									},
								})
							);
							setBearer(true);
							dispatch(closeModal());
						})
						.catch((err: any) => {
							dispatch(closeLoader());
							dispatch(
								openToastAndSetContent({
									toastContent: err.message,
									toastStyles: {
										backgroundColor: 'red',
									},
								})
							);
						});
				}}>
				{(props) => (
					<div className={styles.signinContainer}>
						<div className={styles.account_wrap}>
							<h1 className={styles.account_h1}>{title}</h1>
						</div>
						<div className={styles.signupDiv}>
							<div className={styles.signUpContent}>
								<Form>
									<InputLabel>
										<span className={styles.formTitle}>Role name</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='name'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='name'
										variant='outlined'
										margin='normal'
										type='text'
										size='small'
										fullWidth
									/>

									<InputLabel>
										<span className={styles.formTitle}>Role Description</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='description'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='description'
										variant='outlined'
										margin='normal'
										type='text'
										size='small'
										fullWidth
									/>

									<InputLabel className={styles.mt1}></InputLabel>
									<button
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
										{title === 'Add custom role'
											? 'Add custom role'
											: 'Save changes'}
									</button>
								</Form>
							</div>
						</div>
						{/* <div className={styles.listType}>
							<h3 className={styles.listType_h2}>Permissions</h3>
							<Divider />

							<div className={styles.permisions}>
								<div style={{ marginRight: '30px' }}>
									{accountTypes.slice(0, 5).map(({ id, title }) => (
										<div
											onClick={() => handlePermission(id, title)}
											className={styles.listType_wrap_permission}
											key={id}>
											<div className={styles.circle}>
												<div
													style={{
														background: permission[id] ? 'green' : 'white',
													}}
													className={styles.circle_inner}></div>
											</div>
											<h3 className={styles.listType_h3_permission}>{title}</h3>
										</div>
									))}
								</div>
								<div>
									{accountTypes.slice(5, 10).map(({ id, title }) => (
										<div
											onClick={() => handlePermission(id, title)}
											className={styles.listType_wrap_permission}
											key={id}>
											<div className={styles.circle}>
												<div
													style={{
														background: permission[id] ? 'green' : 'white',
													}}
													className={styles.circle_inner}></div>
											</div>
											<h3 className={styles.listType_h3_permission}>{title}</h3>
										</div>
									))}
								</div>
							</div>
						</div> */}
					</div>
				)}
			</Formik>
		</div>
	);
}

export default RoleModal;
