import React from 'react';
import styles from './BusinessConfig.module.scss';
import { Divider } from '@material-ui/core';
import { InputLabel, TextField } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Select from '../../formUI/Select';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import {
	openLoader,
	closeLoader,
} from '../../../redux/actions/loader/loaderActions';

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
		'& .MuiOutlinedInput-root': {
			color: '#414141',
			fontFamily: 'Roboto',
			fontStyle: 'normal',
			fontWeight: 'normal',
			fontSize: '14px',
			lineHeight: '16px',
		},
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

function BusinessConfig({id}:{id: number | undefined}) {
	const classes = useStyles();

	const dispatch = useDispatch();


	const validate = Yup.object({
		allowAPI: Yup.boolean().required('Required'),
		enableRollingReserve: Yup.boolean().required('Required'),
		rollingReserveSetting: Yup.string().required('Required'),
		allowNoauth: Yup.boolean().required('Required'),
		settlementOption: Yup.string().required('Required'),
		allowPaymentLink: Yup.boolean().required('Required'),
	});

	const settlementOption = [
		{
			name: 'ACCOUNT',
		},
		{
			name: 'BALANCE',
		},
	];

	const contentBoolean = [
		{
			name: false,
		},
		{
			name: true,
		},
	];

	const INITIAL_VALUES = {
		allowAPI: false,
		enableRollingReserve: false,
		rollingReserveSetting: '',
		allowNoauth: false,
		settlementOption: '',
		allowPaymentLink: false,
	};

	return (
		<div className={styles.generalFourReuse}>
			<h3 className={styles.generalh3}>Config Business</h3>
			<Divider />

			<div className={styles.selectinput}>
				<Formik
					initialValues={INITIAL_VALUES}
					validationSchema={validate}
					onSubmit={(values) => {
						console.log(values);
						dispatch(openLoader());

						axios
							.post(`business/${id}/config`, values)
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
							<InputLabel>
								<span className={styles.span}>ALLOW API</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='allowAPI'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='allowAPI'
								size='small'
								options={contentBoolean}
								defaultValue={contentBoolean && contentBoolean[0]}
								className={classes.select}
								// fullWidth
								style={{
									marginTop: '8px',
									marginBottom: '22px',
								}}
							/>

							<InputLabel>
								<span className={styles.span}>ROLLING RESERVE</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='enableRollingReserve'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='enableRollingReserve'
								size='small'
								options={contentBoolean}
								defaultValue={contentBoolean && contentBoolean[0]}
								className={classes.select}
								// fullWidth
								style={{
									marginTop: '8px',
									marginBottom: '22px',
								}}
							/>

							<InputLabel>
								<span className={styles.span}>RESERVE SETTING</span>
							</InputLabel>
							<Field
								as={TextField}
								helperText={
									<ErrorMessage name='rollingReserveSetting'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='rollingReserveSetting'
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

							<InputLabel>
								<span className={styles.span}>ALLOW NO AUTH</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='allowNoauth'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='allowNoauth'
								size='small'
								options={contentBoolean}
								className={classes.select}
								defaultValue={contentBoolean && contentBoolean[0]}
								// fullWidth
								style={{
									marginTop: '8px',
									marginBottom: '22px',
								}}
							/>

							<InputLabel>
								<span className={styles.span}>SETTLEMENT OPTION</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='settlementOption'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='settlementOption'
								size='small'
								options={settlementOption}
								className={classes.select}
								defaultValue={settlementOption && settlementOption[0]}
								// fullWidth
								style={{
									marginTop: '8px',
									marginBottom: '22px',
								}}
							/>

							<InputLabel>
								<span className={styles.span}>ALLOW PAYMENT LINK</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='allowPaymentLink'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='allowPaymentLink'
								size='small'
								options={contentBoolean}
								defaultValue={contentBoolean && contentBoolean[0]}
								className={classes.select}
								// fullWidth
								style={{
									marginTop: '8px',
									marginBottom: '22px',
								}}
							/>

							<button
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
								}}
								type='submit'>
								Submit
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default BusinessConfig;
