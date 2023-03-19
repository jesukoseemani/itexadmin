import ChargebackExport from '../../components/chargebackExportTable/ChargebackExportTable';
import NavBar from '../../components/navbar/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faExclamationCircle,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import styles from './ChargebackManagement.module.scss';

const UploadChargeback = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<NavBar name='All Chargebacks' />
			<div className={styles.error_wrapper}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{/* <FontAwesomeIcon icon={fasExclamationCircle} color='red' /> */}
					<p className={styles.error_errorcontent}>
						227 entries contain errors-
					</p>
					<p className={styles.error_content}>
						227 out of the 2,091 entries has been refunded and will not be
						logged.
					</p>
				</div>
				<div>
					{/* <FontAwesomeIcon icon={faTimes} color='#000000' /> */}
				</div>
			</div>
			<div style={{ margin: '20px 50px' }}>
				<ChargebackExport />
			</div>
		</div>
	);
};

export default UploadChargeback;
