import React from 'react';
import styles from './BusinessStyle.module.scss';
import { Divider } from '@material-ui/core';
import {
	Grid,
	InputLabel,
	TextField,
	TextareaAutosize,
} from '@material-ui/core';
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

function FifthReuse({
	title,
	desc1,
	desc2,
	desc3,
	desc4,
	desc5,
	content,
}: {
	title: string;
	desc1?: string;
	desc2?: string;
	desc3?: string;
	desc4?: string;
	desc5?: string;
	content: { name: string }[];
}) {
	const classes = useStyles();
	const validate = Yup.object({
		currency: Yup.string().required('Required'),
		amout_transaction: Yup.string().required('Required'),
		cummulative: Yup.string().required('Required'),
		frequency: Yup.string().required('Required'),
		description: Yup.string().required('Required'),
		minimum_amount: Yup.string().required('Required'),
		cumulative: Yup.string().required('Required'),
	});

	const INITIAL_VALUES = {
		currency: '',
		amout_transaction: '',
		cummulative: '',
		frequency: '',
		description: '',
	};

	return (
		<div className={styles.generalFifthReuse}>
			<h3 className={styles.generalh3}>{title}</h3>
			<Divider />

			<div className={styles.selectinput2}>
				<Formik
					initialValues={INITIAL_VALUES}
					validationSchema={validate}
					onSubmit={(values) => {
						console.log(values);
					}}>
					{(props) => (
						<Form>
							<Grid
								style={{
									width: '90%',
									margin: '0 auto',
									maxWidth: '787px',
									overflowX: 'hidden',
								}}
								container
								spacing={2}>
								<Grid item xs={12} md={6}>
									<InputLabel>
										<span className={styles.span}>{desc1}</span>
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
										options={content}
										defaultValue={content[0]}
										className={classes.select}
										// fullWidth
										style={{
											marginTop: '8px',
											marginBottom: '22px',
										}}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<InputLabel>
										<span className={styles.span}>{desc2}</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='amout_transaction'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='amout_transaction'
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
								<Grid item xs={12} md={6}>
									<InputLabel>
										<span className={styles.span}>{desc3}</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='cummulative'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='cummulative'
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
								<Grid item xs={12} md={6}>
									<InputLabel>
										<span className={styles.span}>{desc4}</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='frequency'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
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
								</Grid>
								<Grid item xs={12} md={12}>
									<InputLabel>
										<span className={styles.span}>{desc5}</span>
									</InputLabel>
									<Field
										as={TextareaAutosize}
										helperText={
											<ErrorMessage name='description'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='description'
										variant='outlined'
										margin='normal'
										type='text'
										minRows={4}
										className={classes.select}
										style={{
											marginTop: '8px',
											marginBottom: '22px',
											width: '100%',
											border: '1px solid #DDDDDD',
											outline: 'none',
											borderRadius: '4px',
											padding: '10px',
										}}
									/>
								</Grid>
								<Grid item xs={12} md={6}></Grid>
								<Grid item xs={12} md={6}>
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
											padding: '10px 0',
											borderRadius: '4px',
											marginTop: '25px',
											cursor: 'pointer',
										}}
										type='submit'>
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

export default FifthReuse;
