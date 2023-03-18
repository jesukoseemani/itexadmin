import React from 'react';
import styles from './SingleChargeback.module.scss';
import { Divider } from '@material-ui/core';
import { InputLabel, TextField } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Select from '../../../components/formUI/Select';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import {
	openLoader,
	closeLoader,
} from '../../../redux/actions/loader/loaderActions';
import { closeModal } from '../../../redux/actions/modal/modalActions';

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

function SingleChargeback({ id }: { id: number | undefined }) {
	const classes = useStyles();

	const dispatch = useDispatch();
	

	const validate = Yup.object({
		chargebackreason: Yup.string().required('Required'),
		linkingreference: Yup.string().required('Required'),
	});

	const INITIAL_VALUES = {
		chargebackreason: "",
		linkingreference: "",
	};

	return (
		<div className={styles.generalFourReuse}>
			<h3 className={styles.generalh3}>Log Chargeback</h3>
			<Divider />

			<div className={styles.selectinput}>
				<Formik
					initialValues={INITIAL_VALUES}
					validationSchema={validate}
					onSubmit={(values) => {
						console.log(values);
						dispatch(openLoader());

						axios
							.post(`/chargeback/log`, values)
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
								<span className={styles.span}>Reason</span>
							</InputLabel>
							<Field
								as={TextField}
								helperText={
									<ErrorMessage name='chargebackreason'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='chargebackreason'
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
								<span className={styles.span}>LINKING REFERENCE</span>
							</InputLabel>
							<Field
								as={TextField}
								helperText={
									<ErrorMessage name='linkingreference'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='linkingreference'
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

export default SingleChargeback;
