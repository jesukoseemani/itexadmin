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

function FourthReuse({
	title,
	desc1,
	desc2,
	desc3,
	desc4,
	desc5,
	desc6,
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
	content?: { name: string }[];
	content2?: { name: string }[];
	content3?: { name: string }[];
}) {
	const classes = useStyles();
	const validate = Yup.object({
		currency: Yup.string().required('Required'),
		percentage_value: Yup.string().required('Required'),
		flat_value: Yup.string().required('Required'),
		entity: Yup.string().required('Required'),
		transaction_type: Yup.string().required('Required'),
		capped_at: Yup.string().required('Required'),
	});

	const INITIAL_VALUES = {
		currency: `${content ? content[0].name : ''}`,
		percentage_value: '0%',
		flat_value: '0.00',
		entity: `${content3 ? content3[0].name : ''}`,
		transaction_type: `${content2 ? content2[0].name : ''}`,
		capped_at: '0.00',
	};

	return (
		<div className={styles.generalFourReuse}>
			<h3 className={styles.generalh3}>{title}</h3>
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
							{desc1 && (
								<>
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
										defaultValue={content && content[0]}
										className={classes.select}
										// fullWidth
										style={{
											marginTop: '8px',
											marginBottom: '22px',
										}}
									/>
								</>
							)}

							{desc2 && (
								<>
									<InputLabel>
										<span className={styles.span}>{desc2}</span>
									</InputLabel>
									<Field
										as={Select}
										helperText={
											<ErrorMessage name='transaction_type'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='transaction_type'
										size='small'
										options={content2}
										defaultValue={content2 && content2[0]}
										className={classes.select}
										// fullWidth
										style={{
											marginTop: '8px',
											marginBottom: '22px',
										}}
									/>
								</>
							)}

							{desc3 && (
								<>
									<InputLabel>
										<span className={styles.span}>{desc3}</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='percentage_value'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='percentage_value'
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
								</>
							)}

							{desc4 && (
								<>
									<InputLabel>
										<span className={styles.span}>{desc4}</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='flat_value'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='flat_value'
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
								</>
							)}

							{desc5 && (
								<>
									{' '}
									<InputLabel>
										<span className={styles.span}>{desc5}</span>
									</InputLabel>
									<Field
										as={Select}
										helperText={
											<ErrorMessage name='entity'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='entity'
										size='small'
										options={content3}
										className={classes.select}
										defaultValue={content3 && content3[0]}
										// fullWidth
										style={{
											marginTop: '8px',
											// marginBottom: '22px',
										}}
									/>
								</>
							)}

							{desc6 && (
								<>
									{' '}
									<InputLabel>
										<span className={styles.span}>{desc6}</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='capped_at'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='capped_at'
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
								</>
							)}

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

export default FourthReuse;
