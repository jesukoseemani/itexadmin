import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { InputLabel, TextField, Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import styles from './BusinessSignUp.module.scss';
import Logo from '../../assets/images/NavLogo.svg';
import Mark from '../../assets/images/mark.svg';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@material-ui/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import Select from '../../components/formUI/Select';
import axios from 'axios';
import {
	openLoader,
	closeLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { saveAuth } from '../../redux/actions/auth/authActions';
import { saveLoading } from '../../redux/actions/loadingState/loadingStateActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { useHistory } from 'react-router-dom';

const BusinessSignUp = () => {
	const createAccount = [
		{
			id: uuidv4(),
			title: 'Fast and free sign up',
			description: 'Enter your details to create an account.',
			icon: Mark,
		},

		{
			id: uuidv4(),
			title: 'Start accepting payments .',
			description:
				'Start accepting payment using our infrastructure from customers anywhere in the world.',
			icon: Mark,
		},

		{
			id: uuidv4(),
			title: 'Multiple payment options',
			description: 'Accept credit / debit cards, USSD, Bank transfer and more.',
			icon: Mark,
		},
	];

	const businessCategory = [{ name: 'Technology' }, { name: 'Education' }];

	const useStyles = makeStyles({
		root: {
			position: 'absolute',
			left: '-8% !important',
		},
		list: {
			backgroundColor: '#383838',
			width: '15rem',
			overflow: 'hidden',
			color: '#fff',
		},
		primary: {
			fontSize: '212px',
		},
		paper: {
			boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.2)',
		},
		menuItem: {
			width: '100%',
			height: '44px',
			padding: '12px',
			margin: '4px 0px',
			borderRadius: '8px !important',
			'&:hover': {
				background: 'rgba(255, 255, 255, 0.12) !important',
			},
		},
		selectedItem: {
			background: 'rgba(255, 255, 255, 0.12)',
		},
		select: {
			'& ul': {
				backgroundColor: '#cccccc',
			},
			'& li': {
				fontSize: 14,
			},
			'& .MuiInputLabel-root': {
				color: 'rgba(255, 255, 255, 0.81) !important',
			},
		},
		control: {
			position: 'relative',
			color: '#fff',
		},
		searchInput: {
			backgroundColor: 'rgba(255, 255, 255, 0.09)',
			height: '40px',
			borderRadius: '8px',
			fontFamily: 'Geometria !important',
			fontSize: '12px',
			boxShadow: 'none',
		},
	});

	const validate = Yup.object({
		fullName: Yup.string()
			.max(30, 'Must be 30 characters or less')
			.required('Full Name is required'),
		businessName: Yup.string()
			.max(30, 'Must be 30 characters or less')
			.required('Business Name is required'),
		busCategory: Yup.string()
			.max(30, 'Must be 30 characters or less')
			.required('Business Name is required'),
		email: Yup.string()
			.email('Email is invalid')
			.required('Email Address is required'),
		phoneNumber: Yup.string()
			.min(6, 'Phonenumber must be at least 11 charaters')
			.required('Phonenumber is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 charaters')
			.required('Password is required'),
		country: Yup.string()
			.max(15, 'Must be 15 characters or less')
			.required('Country is required'),
		hearAbout: Yup.string()
			.max(30, 'Must be 15 characters or less')
			.required('This is required'),
	});

	const classes = useStyles();

	const dispatch = useDispatch();

	const history = useHistory();

	return (
		<>
			<div className={styles.container}>
				<div className={styles.logo}>
					<img src={Logo} alt='logo' />
				</div>
				<div className={styles.signUpWrapper}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<h2 className={styles.header}>Create Acccount</h2>
							{createAccount.map(({ title, id, icon, description }) => (
								<List key={id}>
									<div className={styles.content}>
										<div>
											<ListItemIcon>
												<img src={icon} alt='mark icon' />
											</ListItemIcon>
										</div>
										<div className={styles.details}>
											<ListItemText>
												<h3 className={styles.title}>{title}</h3>
											</ListItemText>
											<ListItemText>
												<p className={styles.description}>{description}</p>
											</ListItemText>
										</div>
									</div>
								</List>
							))}
						</Grid>
						<Formik
							initialValues={{
								fullName: '',
								email: '',
								password: '',
								country: '',
								businessName: '',
								hearAbout: '',
								phoneNumber: '',
								busCategory: '',
							}}
							validationSchema={validate}
							onSubmit={(values) => {
								const dataValues = {
									...values,
								};
								const firstName = dataValues?.fullName.split(' ')[0];
								const lastName = dataValues?.fullName.split(' ')[1];
								console.log(dataValues);

								axios
									.post('/merchant/account/register', {
										business: {
											email: dataValues?.email,
											account: {
												type: 'business',
												subtype: 'soleprop',
											},
											country: dataValues?.country,
											businessindustrycategory: dataValues?.busCategory,
										},
										user: [
											{
												email: dataValues?.email,
												password: dataValues?.password,
												firstname: firstName,
												middlename: '',
												lastname: lastName,
												country: dataValues?.country,
											},
										],

										meta: [
											{
												name: 'howyouheardaboutus',
												value: dataValues?.hearAbout,
											},
										],
									})

									.then((res) => {
										dispatch(closeLoader());
										dispatch(saveAuth(res.data));
										dispatch(saveLoading(true));
										console.log(res.data);

										dispatch(
											openToastAndSetContent({
												toastContent: 'Signup Successful',
												toastStyles: {
													backgroundColor: 'green',
												},
											})
										);

										history.push('/general_setting');
									})

									.catch((err) => {
										console.log(err);
										dispatch(closeLoader());
										dispatch(saveLoading(false));

										dispatch(
											openToastAndSetContent({
												toastContent: err.response.data.message,
												toastStyles: {
													backgroundColor: 'red',
												},
											})
										);
									});
							}}>
							{(props) => (
								<Grid item xs={12} md={6}>
									<Form>
										<Grid container spacing={2}>
											<Grid item xs={6}>
												<InputLabel className={styles.label}>
													Full Name
												</InputLabel>
												<Field
													as={TextField}
													helperText={
														<ErrorMessage name='fullName'>
															{(msg) => (
																<span style={{ color: 'red' }}>{msg}</span>
															)}
														</ErrorMessage>
													}
													name='fullName'
													variant='outlined'
													margin='normal'
													size='small'
													fullWidth
												/>
											</Grid>
											<Grid item xs={6}>
												<InputLabel className={styles.label}>
													Business name
												</InputLabel>
												<Field
													as={TextField}
													helperText={
														<ErrorMessage name='businessName'>
															{(msg) => (
																<span style={{ color: 'red' }}>{msg}</span>
															)}
														</ErrorMessage>
													}
													name='businessName'
													variant='outlined'
													margin='normal'
													size='small'
													fullWidth
												/>
											</Grid>
											<Grid item xs={6}>
												<FormControl
													classes={{ root: classes.control }}
													fullWidth>
													<InputLabel className={styles.label}>
														Business category
													</InputLabel>
													<Field
														as={Select}
														helperText={
															<ErrorMessage name='busCategory'>
																{(msg) => (
																	<span style={{ color: 'red' }}>{msg}</span>
																)}
															</ErrorMessage>
														}
														name='busCategory'
														size='small'
														options={businessCategory}
														defaultValue={businessCategory[0]}
														// value={businessCategory.value}
														style={{
															marginTop: '1rem',
														}}
													/>
												</FormControl>
											</Grid>
											<Grid item xs={6}>
												<InputLabel className={styles.label}>
													Your position in the business
												</InputLabel>
												{
													<TextField
														placeholder='Nigeria'
														variant='outlined'
														margin='normal'
														size='small'
														fullWidth
													/>
												}
											</Grid>
											<Grid item xs={6}>
												<InputLabel className={styles.label}>Email</InputLabel>
												<Field
													as={TextField}
													helperText={
														<ErrorMessage name='email'>
															{(msg) => (
																<span style={{ color: 'red' }}>{msg}</span>
															)}
														</ErrorMessage>
													}
													name='email'
													variant='outlined'
													margin='normal'
													size='small'
													fullWidth
												/>
											</Grid>
											<Grid item xs={6}>
												<InputLabel className={styles.label}>
													Phone number
												</InputLabel>
												<Field
													as={TextField}
													helperText={
														<ErrorMessage name='phoneNumber'>
															{(msg) => (
																<span style={{ color: 'red' }}>{msg}</span>
															)}
														</ErrorMessage>
													}
													name='phoneNumber'
													variant='outlined'
													margin='normal'
													size='small'
													fullWidth
												/>
											</Grid>
											<Grid item xs={6}>
												<InputLabel className={styles.label}>
													Password
												</InputLabel>
												<Field
													as={TextField}
													helperText={
														<ErrorMessage name='password'>
															{(msg) => (
																<span style={{ color: 'red' }}>{msg}</span>
															)}
														</ErrorMessage>
													}
													name='password'
													type='password'
													variant='outlined'
													margin='normal'
													size='small'
													fullWidth
												/>
											</Grid>
											<Grid item xs={6}>
												<InputLabel className={styles.label}>
													Country
												</InputLabel>
												<Field
													as={TextField}
													helperText={
														<ErrorMessage name='country'>
															{(msg) => (
																<span style={{ color: 'red' }}>{msg}</span>
															)}
														</ErrorMessage>
													}
													name='country'
													variant='outlined'
													margin='normal'
													size='small'
													fullWidth
												/>
											</Grid>
											<Grid item xs={6}>
												<InputLabel className={styles.label}>
													How did you hear about us?
												</InputLabel>
												<Field
													as={TextField}
													helperText={
														<ErrorMessage name='hearAbout'>
															{(msg) => (
																<span style={{ color: 'red' }}>{msg}</span>
															)}
														</ErrorMessage>
													}
													name='hearAbout'
													variant='outlined'
													margin='normal'
													size='small'
													fullWidth
												/>
											</Grid>
											<Grid item xs={6}>
												<InputLabel className={styles.emptyLabel}></InputLabel>
												<Button
													style={{
														backgroundColor: '#27AE60',
														padding: '0.7rem',
														textTransform: 'none',
													}}
													type='submit'
													fullWidth
													variant='contained'
													color='primary'>
													Create Account
												</Button>
												<p className={styles.terms}>
													{' '}
													By clicking the “Create account” button, you agree to
													Itex’s terms and conditions.
												</p>
											</Grid>
										</Grid>
									</Form>
								</Grid>
							)}
						</Formik>
					</Grid>
				</div>
			</div>
		</>
	);
};

export default BusinessSignUp;
