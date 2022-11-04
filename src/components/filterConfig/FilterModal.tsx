import { Backdrop, Button, Modal } from '@mui/material';
import styles from './FilterModal.module.scss';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';

const useModalBtnStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '1rem 1.5rem 1.5rem',
		gap: '1.25rem',
		'& .MuiButton-root': {
			fontFamily: `'Roboto', sans-serif`,
			fontWeight: '500',
			fontSize: '.875rem',
			color: 'black',
			background: '#E0E0E0',
			borderRadius: '3px',
			textTransform: 'none',
			padding: '.35rem .85rem',
		},
		'& .MuiButton-root:nth-child(2)': {
			color: 'white',
			background: '#27AE60',
		},
	},
});

interface FilterModalProps {
	isOpen: boolean;
	handleClose: () => void;
	setEvent?: React.Dispatch<React.SetStateAction<string>>;
	setFromDate?: React.Dispatch<React.SetStateAction<string>>;
	setToDate?: React.Dispatch<React.SetStateAction<string>>;
	setRef?: React.Dispatch<React.SetStateAction<string>>;
	setEmail?: React.Dispatch<React.SetStateAction<string>>;
	setStatus?: React.Dispatch<React.SetStateAction<string>>;
	eventDate?: string;
	clearHandler?: () => void;
	setBearer?: React.Dispatch<React.SetStateAction<boolean>>;
	name?: String;
	setPayment?: React.Dispatch<React.SetStateAction<string>>;
	status?: string;
	payment?: string;
	filterFunction?: () => void;
	changePage?: (value: number) => void;
}

const FilterModal = ({
	isOpen,
	handleClose,
	setEvent,
	setFromDate,
	setToDate,
	setEmail,
	setRef,
	setStatus,
	setPayment,
	eventDate,
	clearHandler,
	setBearer,
	name,
	status,
	payment,
	filterFunction,
	changePage,
}: FilterModalProps) => {
	const classes = useModalBtnStyles();

	const handleClick = (event: any) => {
		setEvent?.(event.currentTarget.getAttribute('data-value'));
	};

	const fromDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFromDate?.(e.target.value);
	};

	const toDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setToDate?.(e.target.value);
	};

	const statusHandler = (e: any) => {
		setStatus?.(e.target.value);
	};

	const paymentHandler = (e: any) => {
		setPayment?.(e.target.value);
	};

	const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail?.(e.target.value);
	};
	const refHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRef?.(e.target.value);
	};

	const applyHandler = () => {
		setBearer?.(true);
		filterFunction?.();
	};

	return (
		<Modal
			open={isOpen}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}>
			<div className={styles.filterModalContainer}>
				<p>Filters</p>
				<hr />
				<div className={styles.modalContent}>
					<div>
						<p>Due date</p>
						<div>
							<p
								style={{ color: eventDate === 'today' ? 'blue' : '' }}
								onClick={handleClick}
								data-value='today'>
								Today
							</p>
							<p
								style={{ color: eventDate === 'last7days' ? 'blue' : '' }}
								onClick={handleClick}
								data-value='last7days'>
								Last 7 days
							</p>
							<p
								style={{ color: eventDate === 'last30days' ? 'blue' : '' }}
								onClick={handleClick}
								data-value='last30days'>
								30 days
							</p>
							<p
								style={{ color: eventDate === 'oneyear' ? 'blue' : '' }}
								onClick={handleClick}
								data-value='oneyear'>
								1 year
							</p>
						</div>
					</div>
					<div>
						<p>Custom date range</p>
						<div>
							<input type='date' onChange={fromDateHandler} />
							<ArrowRightAltIcon />
							<input type='date' onChange={toDateHandler} />
						</div>
					</div>

					{name !== 'transaction' ? (
						<div>
							<p>Customer email</p>
							<input placeholder='e.g test@mail.com' onChange={emailHandler} />
						</div>
					) : (
						<div>
							<p>Transaction Ref</p>
							<input placeholder='e.g ITXH0898383UY38383' onChange={refHandler} />
						</div>
					)}

					{name !== 'transaction' ? (
						<div>
							<p>Status</p>
							<select
								value={status}
								name='status'
								id='status'
								onChange={statusHandler}>
								<option value='' disabled selected hidden>
									Choose status
								</option>
								<option value='APPROVED'>APPROVED</option>
								<option value='PENDING_REVIEW'>PENDING</option>
								<option value='DECLINED'>DECLINED</option>
							</select>
						</div>
					) : (
						<div>
							<p>Status</p>
							<select
								value={status}
								name='status'
								id='status'
								onChange={statusHandler}>
								<option value='' disabled selected hidden>
									Choose status
								</option>
								<option value='00'>Successful</option>
								<option value='09'>Failed</option>
								<option value='78'>Pending</option>
							</select>
						</div>
					)}

					<div>
						<p>Payment type</p>
						<select
							value={payment}
							name='payment_type'
							id='payment_type'
							onChange={paymentHandler}>
							<option value='' disabled selected hidden>
								Select payment type
							</option>
							<option value='card'>Card</option>
							<option value='ussd'>USSD</option>
							<option value='account'>Account</option>
							<option value='bank_transfer'>Bank Transfers</option>
							<option value='payvice'>Payvice</option>
						</select>
					</div>
				</div>
				<hr />
				<div className={classes.root}>
					<Button onClick={clearHandler}>Clear filter</Button>
					<Button onClick={applyHandler}>Apply filter</Button>
				</div>
			</div>
		</Modal>
	);
};

export default FilterModal;
