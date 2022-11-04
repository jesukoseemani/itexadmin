import React from 'react';
import styles from './BusinessStyle.module.scss';
import { Divider } from '@material-ui/core';
import { InputLabel, TextField } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Select from '../../formUI/Select';

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

function AddTerminal() {
	const classes = useStyles();
	const validate = Yup.object({
		terminal_id: Yup.string().required('Required'),
		bank_name: Yup.string().required('Required'),
		model: Yup.string().required('Required'),
		serial_number: Yup.string().required('Required'),
		status: Yup.string().required('Required'),
	});
	const BankContent = [{ name: 'Access Bank' }, { name: 'Kuda Bank' }];
	const StatusContent = [{ name: 'Available' }, { name: 'Pending' }];

	const INITIAL_VALUES = {
		terminal_id: '',
		bank_name: '',
		model: '',
		serial_number: '',
		status: '',
	};

	return (
		<div className={styles.addTerminal}>
			<h3 className={styles.generalh3}>Add Terminal</h3>
			<Divider />

			<div className={styles.selectinput}>
				<Formik
					initialValues={INITIAL_VALUES}
					validationSchema={validate}
					onSubmit={(values) => {
						console.log(values);
					}}>
					{(props) => (
						<Form>
							<InputLabel>
								<span className={styles.span}>Terminal ID</span>
							</InputLabel>
							<Field
								as={TextField}
								helperText={
									<ErrorMessage name='terminal_id'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='terminal_id'
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
								<span className={styles.span}>Bank name</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='bank_name'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='bank_name'
								size='small'
								options={BankContent}
								defaultValue={BankContent && BankContent[0]}
								className={classes.select}
								// fullWidth
								style={{
									marginTop: '8px',
									marginBottom: '22px',
								}}
							/>
							<InputLabel>
								<span className={styles.span}>Model</span>
							</InputLabel>
							<Field
								as={TextField}
								helperText={
									<ErrorMessage name='model'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='model'
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
								<span className={styles.span}>Serial number</span>
							</InputLabel>
							<Field
								as={TextField}
								helperText={
									<ErrorMessage name='serial_number'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='serial_number'
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
								<span className={styles.span}>Status</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='status'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='status'
								size='small'
								options={StatusContent}
								defaultValue={StatusContent && StatusContent[0]}
								className={classes.select}
								// fullWidth
								style={{
									marginTop: '8px',
									marginBottom: '22px',
								}}
							/>
							<div className={styles.button_wrapper}>
								<button
									style={{
										backgroundColor: '#E0E0E0',
										fontFamily: 'Roboto',
										fontStyle: 'normal',
										fontWeight: 'bold',
										fontSize: '16px',
										lineHeight: '19px',
										textAlign: 'center',
										border: 'none',
										outline: 'none',
										width: '108px',
										height: '40px',
										color: ' #333333',
										borderRadius: '4px',
										marginTop: '30px',
										cursor: 'pointer',
									}}
									type='reset'>
									Cancel
								</button>
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
										width: '129px',
										height: '40px',
										color: '#FFFFFF',
										borderRadius: '4px',
										marginTop: '30px',
										cursor: 'pointer',
										marginLeft: '20px',
									}}
									type='submit'>
									Submit
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default AddTerminal;
