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

function UserRoleChangeModal({
	id,
	setBearer,
	firstname,
}: {
	id: number;
	firstname: string;
	setBearer: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const dispatch = useDispatch();
	const [accountTypes, setAccountTypes] = useState<roleTypes>();

	const validate = Yup.object({
		roleId: Yup.string().required('role is required'),
		name: Yup.string().notRequired(),
	});

	useEffect(() => {
		axios
			.get<roleTypes>(`/utility/roles`)
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
			}}>
			<Formik
				initialValues={{
					roleId: '',
					name: firstname,
				}}
				validationSchema={validate}
				onSubmit={(values) => {
					dispatch(openLoader());

					axios
						.post('/usermgt/user/assign/role', {
							userId: Number(id),
							roleId: values.roleId,
						})
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
							<h1 className={styles.account_h1}>Change User Role</h1>
						</div>
						<div className={styles.signupDiv}>
							<div className={styles.signUpContent}>
								<Form>
									<InputLabel>
										<span className={styles.formTitle}>User Name</span>
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
										options={roleOption}
										fullWidth
										disabled
									/>

									<InputLabel>
										<span className={styles.formTitle}>User Role</span>
									</InputLabel>

									<Field
										as={Select}
										helperText={
											<ErrorMessage name='roleId'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='roleId'
										variant='outlined'
										margin='normal'
										type='text'
										size='small'
										options={roleOption}
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
										Save changes
									</button>
								</Form>
							</div>
						</div>
					</div>
				)}
			</Formik>
		</div>
	);
}

export default UserRoleChangeModal;
