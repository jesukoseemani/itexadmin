import React, { useState } from 'react';
import { Divider } from '@material-ui/core';
import styles from './BusinessStyle.module.scss';
import { InputLabel, TextField, Checkbox } from '@material-ui/core';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Select from '../../formUI/Select';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { InputTextField } from '../../formUI/InputTextField';

import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import {
	closeLoader,
	openLoader,
} from '../../../redux/actions/loader/loaderActions';
import { closeModal } from '../../../redux/actions/modal/modalActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
	root: {
		'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			border: 'none',
		},
		'& .MuiOutlinedInput-input.MuiInputBase-input.MuiInputBase-input.MuiOutlinedInput-input':
			{
				textAlign: 'center',
				padding: '8.1px 14px',
			},
	},
	select: {
		'&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			outline: 'none',
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
			backgroundColor: '#ffffff',
		},
		'& .MuiInputLabel-root.Mui-focused': {
			color: '#E0E0E0',
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			border: '1px solid #E0E0E0',
		},
	},
});

function LogSingleChargeRequest({ reflink }: { reflink: string }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const validate = Yup.object({
		otp: Yup.string().required('Required'),
		chargebackreason: Yup.string().required('Required'),
	});

	const INITIAL_VALUES = {
		otp: '',
		chargebackreason: '',
	};

	return (
		<div className={styles.singleChargeRequest2}>
			<h3 className={styles.terminal_h1}>Log Chargeback</h3>
			<Divider />

			<div className={styles.single_wrapper2}>
				<Formik
					initialValues={INITIAL_VALUES}
					validationSchema={validate}
					onSubmit={(values) => {
						console.log(values);
						dispatch(openLoader());
						const newObject = { ...values, linkingreference: reflink };

						axios
							.post(`/v1/chargeback/log`, newObject)
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
					}}>
					{(props) => (
						<Form>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<InputLabel>
										<span className={styles.span}>Reason for Chargeback</span>
									</InputLabel>

									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='chargebackreason'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='chargebackreason'
										placeholder='Enter your description here'
										variant='outlined'
										margin='normal'
										multiline
										minRows={3}
										maxRows={4}
										type='text/number'
										size='small'
										fullWidth
									/>
								</Grid>

								<Grid item xs={12}>
									<InputLabel>
										<span className={styles.span}>Otp</span>
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
										fullWidth
										className={classes.select}
										style={{
											marginTop: '8px',
											marginBottom: '22px',
										}}
									/>
								</Grid>

								<Grid item xs={12}>
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
										Submit
									</button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default LogSingleChargeRequest;
