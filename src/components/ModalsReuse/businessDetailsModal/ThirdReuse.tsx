import React from 'react';
import styles from './BusinessStyle.module.scss';
import { Divider } from '@material-ui/core';
import { Grid, InputLabel, TextField } from '@material-ui/core';
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

function ThirdReuse({
	title,
	desc1,
	desc2,
	desc3,
	desc4,
	desc5,
	desc6,
	desc7,
	content,
	content2,
	content3,
}: {
	title: string;
	desc1?: string;
	desc2?: string;
	desc3?: string;
	desc4?: string;
	desc5?: string;
	desc6?: string;
	desc7?: string;
	content: { name: string }[];
	content2: { name: string }[];
	content3: { name: string; output: string }[];
}) {
	const classes = useStyles();
	const validate = Yup.object({
		payment_type: Yup.string().required('Required'),
		entity_value: Yup.string().required('Required'),
		maximum_amount: Yup.string().required('Required'),
		alias: Yup.string().required('Required'),
		limit: Yup.string().required('Required'),
		minimum_amount: Yup.string().required('Required'),
		cumulative: Yup.string().required('Required'),
	});

	const INITIAL_VALUES = {
		payment_type: content[0].name,
		entity_value: content3[0].name,
		maximum_amount: '0.00',
		alias: 'limit alias',
		limit: content2[0].name,
		minimum_amount: '0.00',
		cumulative: '0.00',
	};

	return (
		<div className={styles.generalThirdReuse}>
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
											<ErrorMessage name='payment_type'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='payment_type'
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
										as={Select}
										helperText={
											<ErrorMessage name='limit'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='limit'
										size='small'
										options={content2}
										defaultValue={content2[0]}
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
										<span className={styles.span}>{desc3}</span>
									</InputLabel>
									<Field
										as={Select}
										helperText={
											<ErrorMessage name='entity_value'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='entity_value'
										size='small'
										options={content3}
										className={classes.select}
										defaultValue={content3[0]}
										// fullWidth
										style={{
											marginTop: '8px',
											// marginBottom: '22px',
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
											<ErrorMessage name='minimum_amount'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='minimum_amount'
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
										<span className={styles.span}>{desc5}</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='maximum_amount'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='maximum_amount'
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
										<span className={styles.span}>{desc6}</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='cumulative'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='cumulative'
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
										<span className={styles.span}>{desc7}</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='alias'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='alias'
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

export default ThirdReuse;
