import React from 'react';
import styles from './MessageComplianceModal.module.scss';
import { InputLabel, TextField, Divider } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

function MessageComplianceModal() {
	const validate = Yup.object({
		subject: Yup.string().required('Required'),
		message: Yup.string().required('Required'),
	});
	return (
		<Formik
			initialValues={{
				subject: '',
				message: '',
			}}
			validationSchema={validate}
			onSubmit={(values) => {
				console.log(values);
			}}>
			{(props) => (
				<div className={styles.modalContainer2}>
					<div className={styles.modalColumn}>
						<div className={styles.modalHeader}>
							<div>
								<span>Send message</span>
							</div>
						</div>
						<Divider />
						<div className={styles.modalBody}>
							<Form>
								<InputLabel>
									<span className={styles.black}>Subject</span>
								</InputLabel>
								<Field
									as={TextField}
									helperText={
										<ErrorMessage name='subject'>
											{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
										</ErrorMessage>
									}
									name='subject'
									placeholder='Type your subject here'
									variant='outlined'
									margin='normal'
									type='text'
									size='small'
									fullWidth
								/>

								<InputLabel>
									<span className={styles.black}>Message</span>
								</InputLabel>
								<Field
									as={TextField}
									helperText={
										<ErrorMessage name='message'>
											{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
										</ErrorMessage>
									}
									name='message'
									placeholder='Type your message here'
									variant='outlined'
									margin='normal'
									type='text'
									multiline
									minRows={4}
									maxRows={6}
									size='small'
									fullWidth
								/>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}>
									<button
										className={styles.buttonMargin}
										style={{
											backgroundColor: '#E0E0E0',
											padding: '0.7rem',
											color: '#333333',
											border: 'none',
											borderRadius: '4px',
											width: '150px',
											height: '44px',
										}}
										type='reset'
										color='primary'>
										Cancel
									</button>

									<button
										className={styles.buttonMargin}
										style={{
											backgroundColor: '#27AE60',
											padding: '0.7rem',
											color: '#fff',
											border: 'none',
											borderRadius: '4px',
											width: '150px',
											height: '44px',
										}}
										type='submit'
										color='primary'>
										Send
									</button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			)}
		</Formik>
	);
}

export default MessageComplianceModal;
