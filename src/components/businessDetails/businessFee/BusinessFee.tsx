import React, { useEffect } from 'react';
import styles from './BusinessFee.module.scss';
import { Divider } from '@material-ui/core';
import { InputLabel, TextField } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Select from '../../formUI/Select';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import {
	openLoader,
	closeLoader,
} from '../../../redux/actions/loader/loaderActions';
import { closeModal } from '../../../redux/actions/modal/modalActions';

import { makeStyles } from '@material-ui/core';

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

function BusinessFee({
	id,
	content,
	identifier,
}: {
	id: number | undefined;
	content?: any;
	identifier: string;
}) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const validate = Yup.object({
		feeType: Yup.string().required('Required'),
		transactionType: Yup.string().required('Required'),
		authOption: Yup.string().required('Required'),
		paymentMethod: Yup.string().required('Required'),
		feeSetting: Yup.string().required('Required'),
		feeCap: Yup.string().required('Required'),
		feeMin: Yup.string().required('Required'),
		merchantBearsFee: Yup.string().required('Required'),
	});

	const authOption = [
		{
			name: '3ds',
		},
		{
			name: 'noauth',
		},
	];

	const transactionOption = [
		{
			name: 'collection',
		},
		{
			name: 'payout',
		},
	];
	const paymentMethodOption = [
		{
			name: 'card',
		},
		{
			name: 'qr',
		},
		{
			name: 'ussd',
		},
		{
			name: 'bank',
		},
		{
			name: 'transfer',
		},
	];

	const transactionLocaleOption = [
		{
			name: 'local',
		},
		{
			name: 'international',
		},
	];
	const merchantBearsFeeOption = [
		{
			name: 'YES',
		},
		{
			name: 'NO',
		},
	];
	const FeeTypeOption = [
		{
			name: 'processing',
		},
		{
			name: 'chargeback',
		},
	];

	const INITIAL_VALUES = {
		transactionType: content ? content.transactiontype : '',
		authOption: content ? content.auth : '',
		paymentMethod: content ? content.payment : '',
		transactionLocale: content ? content.transactionlocale : '',
		minLimit: content ? content.min.split(' ')[1] : '',
		maxLimit: content ? content.max.split(' ')[1] : '',
		cumulativeTransactionLimit: content
			? content.cumulativeTransactionLimit
			: '',
		merchantBearsFee: content ? content.bear : '',
	};

	useEffect(() => {
		console.log('hey:', content);
	}, [content]);

	return (
		<div className={styles.generalFourReuse}>
			<h3 className={styles.generalh3}>Add Fee</h3>
			<Divider />

			<div className={styles.selectinput}>
				<Formik
					initialValues={INITIAL_VALUES}
					validationSchema={validate}
					onSubmit={(values) => {
						console.log(values);
						dispatch(openLoader());
						const newObject =
							identifier === 'edit'
								? {
										...values,
										feeCurrency: 'NG',
										feeId: content?.id,
								  }
								: {
										...values,
										feeCurrency: 'NG',
								  };

						axios
							.post(`business/${id}/fees`, newObject)
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
							<InputLabel>
								<span className={styles.span}>TRANSACTION TYPE</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='transactionType'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='transactionType'
								size='small'
								options={transactionOption}
								defaultValue={transactionOption && transactionOption[0]}
								className={classes.select}
								// fullWidth
								style={{
									marginTop: '8px',
									marginBottom: '22px',
								}}
							/>

							<InputLabel>
								<span className={styles.span}>AUTH OPTIONS</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='authOption'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='authOption'
								size='small'
								options={authOption}
								defaultValue={authOption && authOption[0]}
								className={classes.select}
								// fullWidth
								style={{
									marginTop: '8px',
									marginBottom: '22px',
								}}
							/>

							<InputLabel>
								<span className={styles.span}>SHOULD MERCHANT BEARS FEE?</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='merchantBearsFee'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='merchantBearsFee'
								size='small'
								options={merchantBearsFeeOption}
								defaultValue={
									merchantBearsFeeOption && merchantBearsFeeOption[0]
								}
								className={classes.select}
								// fullWidth
								style={{
									marginTop: '8px',
									marginBottom: '22px',
								}}
							/>

							<InputLabel>
								<span className={styles.span}>PAYMENT METHOD</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='paymentMethod'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='paymentMethod'
								size='small'
								options={paymentMethodOption}
								defaultValue={paymentMethodOption && paymentMethodOption[0]}
								className={classes.select}
								// fullWidth
								style={{
									marginTop: '8px',
									marginBottom: '22px',
								}}
							/>

							<InputLabel>
								<span className={styles.span}>FEE TYPE</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='feeType'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='feeType'
								size='small'
								options={FeeTypeOption}
								defaultValue={FeeTypeOption && FeeTypeOption[0]}
								className={classes.select}
								// fullWidth
								style={{
									marginTop: '8px',
									marginBottom: '22px',
								}}
							/>
							<InputLabel>
								<span className={styles.span}>TRANSACTION LOCALE</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='transactionLocale'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='transactionLocale'
								size='small'
								options={transactionLocaleOption}
								className={classes.select}
								defaultValue={
									transactionLocaleOption && transactionLocaleOption[0]
								}
								// fullWidth
								style={{
									marginTop: '8px',
									marginBottom: '22px',
								}}
							/>

							<InputLabel>
								<span className={styles.span}>MIN FEE</span>
							</InputLabel>
							<Field
								as={TextField}
								helperText={
									<ErrorMessage name='feeMin'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='feeMin'
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
								<span className={styles.span}>FEE CAP</span>
							</InputLabel>
							<Field
								as={TextField}
								helperText={
									<ErrorMessage name='feeCap'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='feeCap'
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
								<span className={styles.span}>FEE SETTINGS</span>
							</InputLabel>
							<Field
								as={TextField}
								helperText={
									<ErrorMessage name='feeSetting'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='feeSetting'
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

export default BusinessFee;
