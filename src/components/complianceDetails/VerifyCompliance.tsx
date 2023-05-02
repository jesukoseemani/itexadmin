import styles from './styles.module.scss';
import * as Yup from 'yup';

import { Grid, InputLabel, TextField } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';

import { makeStyles } from '@material-ui/core';
import Select from '../formUI/Select';
import { Box } from '@mui/material';
import axios from 'axios';
import { closeModal } from '../../redux/actions/modal/modalActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { useDispatch } from 'react-redux';

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

interface MsgProps {
	code?: string;
	message: string;
}
const VerifyCompliance = ({ doc, fn }: any) => {
	const dispatch = useDispatch();
	const validate = Yup.object({
		status: Yup.string().required('Required'),
		otp: Yup.string().required('Required'),
	});

	console.log(doc, 'doccc');

	const actionOption = [
		{
			name: 'approve',
		},
		{
			name: 'reject',
		},
	];

	const classes = useStyles();

	return (
		<div className={styles.approval__box}>
			<Box className={styles.headerTitle}>
				<h2>Verify Document</h2>
			</Box>
			<Box>
				<Formik
					initialValues={{
						status: '',
						otp: '',
						merchantaccountid: doc?.merchantaccountid,
						docid: doc?.id,
					}}
					validationSchema={validate}
					onSubmit={async (values) => {
						const { data } = await axios.post<MsgProps>(
							'/v1/compliance/business/docs/verify',
							values
						);
						console.log(data);
						if (data?.code === 'success') {
							dispatch(
								openToastAndSetContent({
									toastContent: data?.message,
									toastStyles: {
										backgroundColor: 'green',
									},
								})
							);
							fn();
							dispatch(closeModal());
						} else {
							dispatch(
								openToastAndSetContent({
									toastContent: data?.message,
									toastStyles: {
										backgroundColor: 'red',
									},
								})
							);
						}
					}}>
					{(props) => (
						<div className={styles.approvalmodalBody}>
							<Form>
								<Grid item xs={12}>
									<InputLabel>
										<span className={styles.header}>Action</span>
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
										options={actionOption}
										defaultValue={actionOption && actionOption[0]}
										className={classes.select}
										// fullWidth
										style={{
											marginTop: '8px',
											marginBottom: '22px',
											width: '100%',
										}}
									/>
								</Grid>

								<Grid item xs={12}>
									<InputLabel>
										<span className={styles.header}>OTP</span>
									</InputLabel>

									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='otp'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='otp'
										placeholder='Otp'
										variant='outlined'
										margin='normal'
										type='text'
										size='small'
										fullWidth
									/>
								</Grid>

								<Grid container spacing={2}>
									<Grid item xs={12}>
										<button type='submit'>Submit</button>
									</Grid>
								</Grid>
							</Form>
						</div>
					)}
				</Formik>
			</Box>
		</div>
	);
};

export default VerifyCompliance;
