import React, { useEffect } from 'react';
import styles from './BusinessSchedule.module.scss';
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

function BusinessSchedule({
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
		paymentMethod: Yup.string().required('Required'),
		locale: Yup.string().required('Required'),
		periodSetting: Yup.string().required('Required'),
	});

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

	const INITIAL_VALUES = {
		periodSetting: content ? content?.periodsetting : '',
		paymentMethod: '',
		locale: content ? content?.locale : '',
	};

	return (
		<div className={styles.generalFourReuse}>
			<h3 className={styles.generalh3}>{identifier} Schedule</h3>
			<Divider />

			<div className={styles.selectinput}>
				<Formik
					initialValues={INITIAL_VALUES}
					validationSchema={validate}
					onSubmit={(values) => {
						console.log(values);
						dispatch(openLoader());
						const newObject =
							identifier === 'Edit'
								? {
										...values,
										scheduleId: content?.id,
								  }
								: {
										...values,
								  };

						axios
							.post(`/v1/business/${id}/settlement/schedule`, newObject)
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
								<span className={styles.span}>LOCALE</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='locale'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='locale'
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
								<span className={styles.span}>PERIOD SETTING</span>
							</InputLabel>
							<Field
								as={TextField}
								helperText={
									<ErrorMessage name='periodSetting'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='periodSetting'
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

export default BusinessSchedule;
