import React, { useEffect, useState } from 'react';
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
import Select from '../formUI/OtherSelect';
import { Divider } from '@mui/material';
import { useHistory } from 'react-router';
import { closeModal } from '../../redux/actions/modal/modalActions';

interface roleTypes {
	roles: [
		{
			id: number;
			userRoleName: string;
			roleDescription: string;
			status: boolean;
			createdBy: null | string;
			createdAt: string;
			deletedAt: null | string;
			isDeleted: boolean;
		}
	];
}

function UserModal({
	title,
	setBearer,
	editDetails,
	link
}: {
	title: string;
	setBearer: React.Dispatch<React.SetStateAction<boolean>>;
	editDetails?: any;
	link?: string;
}) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [accountTypes, setAccountTypes] = useState<roleTypes>();
	interface ResponseData {
		email: string;
		role: string;
	}

	const validate = Yup.object({
		email: Yup.string()
			.email('Email is invalid')
			.required('Email Address is required'),
		otp: Yup.string().required('otp is required'),
		firstname: Yup.string().required('firstname is required'),
		lastname: Yup.string().required('lastname is required'),
		phoneNumber: Yup.string().required('phoneNumber is required'),
		institution: Yup.string().required('institution is required'),
	});

	useEffect(() => {
		axios
			.get<roleTypes>(`/v1/utility/roles`)
			.then((res) => {
				setAccountTypes(res.data);
			})
			.catch((err) => console.log(err));
	}, [dispatch]);

	const roleOption = accountTypes?.roles.map((item) => ({
		...item,
		name: item.userRoleName,
	}));

	return (
		<div
			style={{
				color: 'rgba(0, 0, 0, 1)',
				backgroundColor: '#ffffff',
				overflowY: 'hidden',
				minHeight: '650px',
			}}>
			<Formik
				initialValues={{
					email: editDetails?.email || '',
					firstname: editDetails?.firstname || '',
					lastname: editDetails?.lastname || '',
					otp: '',
					phoneNumber: editDetails?.phoneNumber || '',
					institution: editDetails?.institution || '',
				}}
				validationSchema={validate}
				onSubmit={(values) => {
					dispatch(openLoader());

					axios
						.post(`${link}`, values)
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
										<span className={styles.formTitle}>Email Address</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='email'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='email'
										variant='outlined'
										margin='normal'
										type='email'
										size='small'
										fullWidth
									/>
									<InputLabel>
										<span className={styles.formTitle}>otp</span>
									</InputLabel>

									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='otp'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='otp'
										variant='outlined'
										margin='normal'
										type='text'
										size='small'
										options={roleOption}
										fullWidth
									/>
									<InputLabel>
										<span className={styles.formTitle}>First Name</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='firstname'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='firstname'
										variant='outlined'
										margin='normal'
										type='text'
										size='small'
										fullWidth
									/>
									<InputLabel>
										<span className={styles.formTitle}>Last Name</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='lastname'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='lastname'
										variant='outlined'
										margin='normal'
										type='text'
										size='small'
										fullWidth
									/>
									<InputLabel>
										<span className={styles.formTitle}>Mobile Number</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='phoneNumber'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='phoneNumber'
										variant='outlined'
										margin='normal'
										type='text'
										size='small'
										fullWidth
									/>
									<InputLabel>
										<span className={styles.formTitle}>Institution</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='institution'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='institution'
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
										{title === 'Edit user' ? 'Save changes' : 'Send invite'}
									</button>
								</Form>
							</div>
						</div>
						<div className={styles.listType}>
							<h3 className={styles.listType_h2}>Roles</h3>
							<Divider />
							{accountTypes?.roles.map(
								({ id, userRoleName, roleDescription }) => (
									<div className={styles.listType_wrap} key={id}>
										<h3 className={styles.listType_h3}>{userRoleName}</h3>
										<p className={styles.listType_p}>{roleDescription}</p>
									</div>
								)
							)}
						</div>
					</div>
				)}
			</Formik>
		</div>
	);
}

export default UserModal;
