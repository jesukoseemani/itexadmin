import React from 'react';
import styles from './AddBankModal.module.scss';
import { Grid } from '@material-ui/core';
import { Formik, Field, ErrorMessage } from 'formik';
import { InputLabel, TextField, Button } from '@material-ui/core';
import Select from '../formUI/Select';
import * as Yup from 'yup';
const AddBankModal = () => {
	const validate = Yup.object({
		bankName: Yup.string().max(30, 'Must be 11 characters').required(),
		bankCode: Yup.string()
			.max(30, 'Must be 30 characters or less')
			.required('Registered Address is required'),
	});

	const settlementOptions = {
		BA: 'Bank Account',
	};
	return (
		<div style={{ width: '100%', maxWidth: '400px', overflowY: 'hidden' }}>
			<div className={styles.header}>
				<h3>Add a new Bank</h3>
			</div>
			<div style={{ width: '80%', margin: '0 auto' }}>
				<Formik
					initialValues={{
						bankName: '',
						bankCode: '',
					}}
					validationSchema={validate}
					onSubmit={(values) => {
						console.log(values);
					}}>
					{(props) => (
						<Grid container spacing={2}>
							<Grid item md={12}>
								<InputLabel>Bank Name</InputLabel>
								<Field
									as={TextField}
									helperText={
										<ErrorMessage name='bankName'>
											{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
										</ErrorMessage>
									}
									name='bankName'
									placeholder='Access bank'
									variant='outlined'
									margin='normal'
									size='small'
									fullWidth
								/>
							</Grid>
							<Grid item md={12}>
								<InputLabel>Bank Code</InputLabel>
								<Field
									as={TextField}
									helperText={
										<ErrorMessage name='certificate'>
											{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
										</ErrorMessage>
									}
									name='bankCode'
									placeholder='093'
									variant='outlined'
									margin='normal'
									size='small'
									fullWidth
								/>
							</Grid>

							<Grid item md={12}>
								<Button
									variant='contained'
									style={{
										background: 'rgba(39, 174, 96, 1)',
										color: 'white',
										marginTop: '0.8rem',
										padding: '0.9rem',
										marginBottom: '2rem',
									}}
									fullWidth
									type='submit'>
									Add Bank
								</Button>
							</Grid>
						</Grid>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default AddBankModal;
