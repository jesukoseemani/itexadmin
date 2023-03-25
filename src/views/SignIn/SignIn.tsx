import { useEffect } from 'react';
import { InputLabel, TextField } from '@material-ui/core';
import styles from './SignIn.module.scss';
import Logo from '../../assets/images/NavLogo.svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import {
	openLoader,
	closeLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveAuth } from '../../redux/actions/auth/authActions';
import { saveLoading } from '../../redux/actions/loadingState/loadingStateActions';
import { saveCountry } from '../../redux/actions/country/countryActions';
import aYAxios from '../../components/axiosInstance';
import { savePermission } from '../../redux/actions/permission/permissionActions';

const SignIn = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	interface ResponseData {
		email: string;
		password: string;
	}

	const validate = Yup.object({
		email: Yup.string()
			.email('Email is invalid')
			.required('Email Address is required'),
		password: Yup.string()
			.min(3, 'Password must be at least 3 charaters')
			.required('Password is required'),
	});

	const userPermissionHandler = (data: any, module: any) => {
		// const permissions = Object.values(data).flat();
		let permissionsObject: any = {};
		for (var i = 0; i < data.length; i++) {
			permissionsObject[data[i].controllerName] = module.includes(
				data[i].controllerName
			);
		}
		return permissionsObject;
	};

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={validate}
			onSubmit={(values) => {
				dispatch(openLoader());

				axios
					.post('/auth/authenticate', values)
					.then((res: any) => {
						dispatch(closeLoader());
						dispatch(saveAuth(res.data));
						dispatch(saveLoading(true));
						history.push('/');
						dispatch(
							openToastAndSetContent({
								toastContent: res.data.message,
								toastStyles: {
									backgroundColor: 'green',
								},
							})
						);
						const module = res.data.modules;

						if (
							res?.data.message ===
							'Your are required to change your temporary password.'
						) {
							dispatch(
								openToastAndSetContent({
									toastContent: res.data.message,
									toastStyles: {
										backgroundColor: 'green',
									},
								})
							);

							history.push({
								pathname: '/newpassword',
								state: { email: values.email },
							});
						} else {
							axios
								.get('/v1/utility/modules')
								.then((respond: any) => {
									dispatch(closeLoader());
									const newPermission = userPermissionHandler(
										respond.data.modules,
										module
									);

									console.log('permisiiii:', newPermission);
									dispatch(savePermission(newPermission));
									dispatch(saveLoading(true));
									history.push('/');
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
									dispatch(saveLoading(false));
									dispatch(
										openToastAndSetContent({
											toastContent: err.data.message,
											toastStyles: {
												backgroundColor: 'red',
											},
										})
									);
								});
						}
					})
					.catch((err) => {
						dispatch(closeLoader());
						dispatch(saveLoading(false));
						dispatch(
							openToastAndSetContent({
								toastContent: err.data.message,
								toastStyles: {
									backgroundColor: 'red',
								},
							})
						);
					});
			}}>
			{(props) => (
				<div className={styles.signinContainer}>
					<div className={styles.logo}>
						<img src={Logo} alt='' />
					</div>
					<div className={styles.mt1}>
						<div className={styles.signinDiv}>
							<h5 className={styles.signinHeader}>Sign in to your account</h5>
							<div className={styles.mt2}>
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
										<span className={styles.formTitle}>Password</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='password'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='password'
										variant='outlined'
										margin='normal'
										type='password'
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
										Sign In
									</button>
									<InputLabel>
										<div
											onClick={() => history.push('/forgotpassword')}
											className={styles.sub}>
											<p className={styles.formSub}>
												<span>Forgot Password?</span>
											</p>
										</div>
									</InputLabel>
								</Form>
							</div>
						</div>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default SignIn;
