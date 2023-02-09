import React, { useState } from 'react';
import styles from './BusinessModal.module.scss';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

function AccountType({ title }: { title: string }) {
	const accountTypes = [
		{
			id: 'individual',
			title: 'Individual',
			description: 'Enter your details to create an account.',
		},

		{
			id: 'business',
			title: 'Business',
			description:
				'Start accepting payment using our infrastructure from customers anywhere in the world.',
		},

		{
			id: 'ngo',
			title: 'NGO',
			description: 'Accept credit / debit cards, USSD, Bank transfer and more.',
		},
	];

	const [selectedValue, setSelectedValue] = useState<string | undefined>(
		undefined
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value);
	};

	const history = useHistory();

	const handleSubmit = () => {};

	const theme = {
		overrides: {
			MuiRadio: {
				colorSecondary: {
					'&$checked': {
						color: 'green',
					},
				},
			},
		},
	};

	const muiTheme = createTheme(theme);

	return (
		<div
			style={{
				color: 'rgba(0, 0, 0, 1)',
				backgroundColor: '#ffffff',
				overflow: 'hidden',
			}}>
			<div className={styles.account_wrap}>
				<h1 className={styles.account_h1}>Add a new {title}</h1>
			</div>
			<div className={styles.signupDiv}>
				<div className={styles.signUpContent}>
					<FormControl>
						<h4 className={styles.signupHeader}>Select Account Type</h4>
						<RadioGroup
							aria-labelledby='demo-radio-buttons-group-label'
							name='controlled-radio-buttons-group'
							value={selectedValue}
							onChange={handleChange}>
							{accountTypes.map(({ id, title, description }) => (
								<div id='divRadioGroup' className={styles.divRadioGroup}>
									<ThemeProvider theme={muiTheme}>
										<FormControlLabel
											value={id}
											control={<Radio />}
											label={
												<ListItemText>
													<div className={styles.ml}>
														<h5 className={styles.title}>{title}</h5>
														<p className={styles.desc}>{description}</p>
													</div>
												</ListItemText>
											}
										/>
									</ThemeProvider>
								</div>
							))}
						</RadioGroup>
						<div className={styles.buttonDiv}>
							<button
								style={{
									backgroundColor: '#27AE60',
									padding: '0.7rem',
									width: '80%',
									color: '#fff',
									border: 'none',
									borderRadius: '4px',
									cursor: 'pointer',
								}}
								type='submit'
								color='primary'
								onClick={handleSubmit}>
								Continue
							</button>
						</div>
					</FormControl>
				</div>
			</div>
		</div>
	);
}

export default AccountType;
