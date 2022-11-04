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

function SingleChargeRequest() {
	const contentCurrency = ['NGN', 'USD'];

	const contentStage = ['New', 'Old'];

	const contentType = ['Local', 'International'];

	const classes = useStyles();

	const validate = Yup.object({
		id: Yup.string().required('Required'),
		currency: Yup.string().required('Required'),
		chargeback_stage: Yup.string().required('Required'),
		type: Yup.string().required('Required'),
		frequency: Yup.string().required('Required'),
		new_due_date: Yup.string().required('Required'),
		reason: Yup.string().required('Required'),
		check: Yup.string().required('Required'),
	});

	const INITIAL_VALUES = {
		id: '',
		currency: '',
		chargeback_stage: '',
		type: '',
		frequency: '',
		new_due_date: '',
		reason: '',
		check: '',
	};

	return (
		<div className={styles.singleChargeRequest}>
			<h3 className={styles.terminal_h1}>Log Chargeback</h3>
			<Divider />

			<div className={styles.single_wrapper}>
				<Formik
					initialValues={INITIAL_VALUES}
					validationSchema={validate}
					onSubmit={(values) => {
						console.log(values);
					}}>
					{(props) => (
						<Form>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<InputLabel>
										<span className={styles.span}>Id</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='id'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='id'
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
								<Grid item xs={6}>
									<InputLabel>
										<span className={styles.span}>Currency</span>
									</InputLabel>
									<Field
										as={Select}
										helperText={
											<ErrorMessage name='currency'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='currency'
										size='small'
										options={contentCurrency}
										defaultValue={contentCurrency && contentCurrency[0]}
										className={classes.select}
										// fullWidth
										style={{
											marginTop: '8px',
											marginBottom: '22px',
										}}
									/>
								</Grid>
								<Grid item xs={6}>
									<InputLabel>
										<span className={styles.span}>Chargeback stage</span>
									</InputLabel>
									<Field
										as={Select}
										helperText={
											<ErrorMessage name='chargeback_stage'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='chargeback_stage'
										size='small'
										options={contentStage}
										defaultValue={contentStage && contentStage[0]}
										className={classes.select}
										// fullWidth
										style={{
											marginTop: '8px',
											marginBottom: '22px',
										}}
									/>
								</Grid>

								<Grid item xs={6}>
									<InputLabel>
										<span className={styles.span}>Type</span>
									</InputLabel>
									<Field
										as={Select}
										helperText={
											<ErrorMessage name='type'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='type'
										size='small'
										options={contentType}
										defaultValue={contentType && contentType[0]}
										className={classes.select}
										// fullWidth
										style={{
											marginTop: '8px',
											marginBottom: '22px',
										}}
									/>
								</Grid>

								<Grid item xs={6}>
									<InputLabel>
										<span className={styles.span}>Frequency</span>
									</InputLabel>
									<div style={{ display: 'flex' }}>
										<div>
											<Field
												as={Select}
												helperText={
													<ErrorMessage name='currency'>
														{(msg) => (
															<span style={{ color: 'red' }}>{msg}</span>
														)}
													</ErrorMessage>
												}
												name='currency'
												size='small'
												options={contentCurrency}
												defaultValue={contentCurrency && contentCurrency[0]}
												className={classes.select}
												// fullWidth
												style={{
													marginTop: '8px',
													marginBottom: '22px',
													width: 'fit-content',
												}}
											/>
										</div>
										<div style={{ flex: '1' }}>
											<Field
												as={TextField}
												helperText={
													<ErrorMessage name='frequency'>
														{(msg) => (
															<span style={{ color: 'red' }}>{msg}</span>
														)}
													</ErrorMessage>
												}
												name='frequency'
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
										</div>
									</div>
								</Grid>

								<Grid item xs={6}>
									<InputLabel>
										<span className={styles.span}>New due date</span>
									</InputLabel>
									<InputTextField
										label=''
										name='new_due_date'
										type='date'
										className={styles.selectInputDate}
										// fullWidth
										style={{
											marginTop: '8px',
											marginBottom: '22px',
										}}
									/>
								</Grid>

								<Grid item xs={6}></Grid>

								<Grid item xs={12}>
									<InputLabel>
										<span>Reason for Chargeback</span>
									</InputLabel>

									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='reason'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='reason'
										placeholder='Enter your description here'
										variant='outlined'
										margin='normal'
										multiline
										minRows={2}
										maxRows={3}
										type='text/number'
										size='small'
										fullWidth
									/>
								</Grid>

								<Grid item xs={12} md={12}>
									<FormGroup>
										<FormControlLabel
											name='check'
											control={<Checkbox defaultChecked />}
											label={
												<Typography className={styles.formControlLabel}>
													Include weekends when determining due date
												</Typography>
											}
										/>
									</FormGroup>
								</Grid>
								<Grid item xs={12} md={6}>
									{' '}
								</Grid>
								<Grid item xs={12} md={6}>
									<button
										className={styles.buttonMargin}
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

export default SingleChargeRequest;
