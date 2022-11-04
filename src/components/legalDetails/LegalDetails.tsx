import React, { useState } from 'react';
import styles from './LegalDetails.module.scss';
import NavBar from '../navbar/NavBar';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Divider } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router';
import { BusinessTableApiTypes } from '../../types/UserTableTypes';
import { useDispatch } from 'react-redux';

const bodyData = [
	{
		document_name: 'james holiday',
		document_id: '8989012',
		document_image: 'https://picsum.photos/500/500',
		document_date: 'Aug 13 2020',
	},
	{
		document_name: 'yemi michael',
		document_id: '8989013',
		document_image: 'https://picsum.photos/500/500',
		document_date: 'Aug 13 2020',
	},
	{
		document_name: 'bola adeola',
		document_id: '8989014',
		document_image: 'https://picsum.photos/500/500',
		document_date: 'Aug 13 2020',
	},
	{
		document_name: 'jameson selman',
		document_id: '8989015',
		document_image: 'https://picsum.photos/500/500',
		document_date: 'Aug 13 2020',
	},
	{
		document_name: 'joshua akin',
		document_id: '8989016',
		document_image: 'https://picsum.photos/500/500',
		document_date: 'Aug 13 2020',
	},
	{
		document_name: 'koshman rough',
		document_id: '8989017',
		document_image: 'https://picsum.photos/500/500',
		document_date: 'Aug 13 2020',
	},
	{
		document_name: 'ife madam',
		document_id: '8989018',
		document_image: 'https://picsum.photos/500/500',
		document_date: 'Aug 13 2020',
	},
	{
		document_name: 'sam monday',
		document_id: '8989019',
		document_image: 'https://picsum.photos/500/500',
		document_date: 'Aug 13 2020',
	},
	{
		document_name: 'yinka right',
		document_id: '8989020',
		document_image: 'https://picsum.photos/500/500',
		document_date: 'Aug 13 2020',
	},
	{
		document_name: 'victor once',
		document_id: '8989021',
		document_image: 'https://picsum.photos/500/500',
		document_date: 'Aug 13 2020',
	},
];

interface datatypes {
	document_name: string;
	document_id: string;
	document_image: string;
	document_date: string;
}

function LegalDetails() {
	const [details, setDetails] = useState<BusinessTableApiTypes>();
	const [data, setData] = useState<datatypes[]>(bodyData);
	const [displayData, setDisplayData] = useState<datatypes[]>([
		{
			document_name: `${data[0].document_name}`,
			document_id: `${data[0].document_id}`,
			document_image: `${data[0].document_image}`,
			document_date: `${data[0].document_date}`,
		},
	]);
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();

	const urlId = location.pathname.split('/')[2];

	const contentChangeHandler = (id: string) => {
		const filtered = data.filter((item) => item.document_id === id);
		console.log('iam:', filtered);
		setDisplayData(filtered);
	};

	// useEffect(() => {
	// 	axios
	// 		.get<BusinessTableApiTypes>(
	// 			`https://staging.itex-pay.com/ipg/api/v1/admin/business?merchantcode=${urlId}`
	// 		)
	// 		.then((res) => {
	// 			setDetails(res.data);
	// 		});
	// }, [urlId]);

	return (
		<div className={styles.container}>
			<NavBar name='business' />

			<div onClick={() => history.goBack()} className={styles.back}>
				<span className={styles.back_span}>
					<ArrowLeftIcon />
				</span>{' '}
				<p className={styles.back_paragraph}> Back to business</p>
			</div>

			<div className={styles.detailsHeader}>
				<div className={styles.detailsHeaderLeft}>
					<h1 className={styles.header_left_h1}>24 documents</h1>
				</div>

				<div className={styles.detailsHeaderRight}>
					<button className={styles.header_right_button}>Upload</button>
				</div>
			</div>

			<div className={styles.mainbody}>
				<div className={styles.header_main}>
					<h1 className={styles.header_main_h1}>Document id</h1>
					<h1 className={styles.header_main_h1}>Date uploaded</h1>
				</div>

				<div className={styles.header_main_right}></div>
			</div>

			<div className={styles.mainbody}>
				<div className={styles.header_main_content}>
					{data.map((item) => (
						<>
							<div
								onClick={() => contentChangeHandler(item.document_id)}
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignContent: 'center',
									padding: '5px 0',
									cursor: 'pointer',
								}}>
								<h1 className={styles.header_main_h1}>{item.document_id}</h1>
								<h1 className={styles.header_main_h1}>{item.document_date}</h1>
							</div>
							<Divider />
						</>
					))}
				</div>

				<div className={styles.header_main_right_content}>
					<h5 className={styles.right_h5}>Document name</h5>
					<h4 className={styles.right_h4}>{displayData[0].document_name}</h4>
					<img
						className={styles.image_display}
						src={displayData[0].document_image}
						alt=''
					/>
					<div className={styles.legal_wrapper_flex}>
						<button className={styles.legal_button_cancel}>Delete</button>
						<button className={styles.legal_button}>Download</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LegalDetails;
