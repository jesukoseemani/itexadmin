import { InputLabel, TextField } from '@material-ui/core';
import styles from './Login.module.scss';
import Logo from '../../assets/images/NavLogo.svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import axios from 'axios';
import useQuery from '../../hooks/useQuery';

const ResetCompletePassword = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	let query = useQuery();

	const email = query.get('email');
	const token = query.get('token');

	console.log('dembe:', email, token);

	const validate = Yup.object({
		password: Yup.string()
			.min(6, 'Password must be at least 6 charaters')
			.required('Password is required'),
	});

	return (
		<Formik
			initialValues={{
				email,
				token,
				password: '',
			}}
			validationSchema={validate}
			onSubmit={(values) => {
				console.log(values);
				dispatch(openLoader());

				axios
					.post('/auth/password/reset/complete', values)
					.then((res: any) => {
						dispatch(closeLoader());
						dispatch(
							openToastAndSetContent({
								toastContent: res?.data?.message,
								toastStyles: {
									backgroundColor: 'green',
								},
							})
						);

						history.push('/signin');
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
					<div className={styles.logo}>
						<img src={Logo} alt='' />
					</div>
					<div className={styles.mt1}>
						<div className={styles.signinDiv}>
							<div className={styles.signinHeader}>
								<h5 className={styles.headerH}>New Password</h5>
								<p className={styles.mt1} />
								<p className={styles.headerP}>
									let’s set up a new password for your account
								</p>
							</div>
							<div className={styles.mt2}>
								<Form>
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
										placeholder='******'
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
										}}
										type='submit'
										color='primary'>
										Reset Password
									</button>
								</Form>
							</div>
						</div>
					</div>

					<div className={styles.sub}>
						<p className={styles.mt2}>
							<span className={styles.subP}>
								<a
									onClick={() => history.push('/signin')}
									className={styles.signinAnchor}>
									Back to Login
								</a>
							</span>
						</p>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default ResetCompletePassword;
