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

function SecondReuse({
	title,
	desc1,
	desc2,
	desc3,
	content,
	content2,
}: {
	title: string;
	desc1?: string;
	desc2?: string;
	desc3?: string;
	content: { name: string }[];
	content2: { name: string }[];
}) {
	const classes = useStyles();
	const validate = Yup.object({
		currency: Yup.string().required('Required'),
		settlement_cycle: Yup.string().required('Required'),
		settlement_type: Yup.string().required('Required'),
	});

	const INITIAL_VALUES = {
		currency: content2[0].name,
		settlement_cycle: '1',
		settlement_type: content[0].name,
	};

	return (
		<div className={styles.generalSecondReuse}>
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
								options={content2}
								defaultValue={content2[0]}
								className={classes.select}
								// fullWidth
								style={{
									marginTop: '8px',
									marginBottom: '22px',
								}}
							/>
							<InputLabel>
								<span className={styles.span}>{desc2}</span>
							</InputLabel>
							<Field
								as={TextField}
								helperText={
									<ErrorMessage name='settlement_cycle'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='settlement_cycle'
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
								<span className={styles.span}>{desc3}</span>
							</InputLabel>
							<Field
								as={Select}
								helperText={
									<ErrorMessage name='settlement_type'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='settlement_type'
								size='small'
								options={content}
								className={classes.select}
								defaultValue={content[0]}
								// fullWidth
								style={{
									marginTop: '8px',
									// marginBottom: '22px',
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

export default SecondReuse;
