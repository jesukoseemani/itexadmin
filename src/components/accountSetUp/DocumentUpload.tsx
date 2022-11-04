import React, { useState } from 'react';
import style from './BusinessModal.module.scss';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import RcDocument from './RcDocumentModal';
import RnDocument from './RnDocumentModal';

import './test.css';
const DocumentUpload = () => {
	const [active, setActive] = useState(false);
	const [stageValue, setStageValue] = useState('');

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = e.target;
		if (checked) {
			setActive(true);
			setStageValue(value);
		} else {
			setActive(false);
		}
	};
	const dispatch = useDispatch();

	const modalHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<div className='modalDiv'>
						{stageValue === 'RC Document' ? <RcDocument /> : <RnDocument />}
					</div>
				),
			})
		);
	};

	return (
		<div style={{ color: 'rgba(0, 0, 0, 1)' }}>
			<div className={style.header}>
				<h3>Document upload</h3>
			</div>
			<div className='form__group'>
				<h5 className='form__select_type'>Select the registration you have</h5>
				<div className='form__radio-group'>
					<input
						type='radio'
						className='form__radio-input'
						id='rc'
						name='size'
						value='RC Document'
						defaultChecked
						onChange={changeHandler}
					/>
					<label htmlFor='rc' className='form__radio-label'>
						<span className='form__radio-button'></span>
						<div className='content'>
							<h3 className='content_h1'>RC Document</h3>
							<p className='content_p'>For Limited companies</p>
						</div>
					</label>
				</div>

				<div className='form__radio-group'>
					<input
						type='radio'
						className='form__radio-input'
						id='bn'
						name='size'
						value='BN Document'
						onChange={changeHandler}
					/>
					<label htmlFor='bn' className='form__radio-label'>
						<span className='form__radio-button'></span>
						<div className='content'>
							<h3 className='content_h1'>BN Document</h3>
							<p className='content_p'>Business name ventures, etc.</p>
						</div>
					</label>
				</div>
			</div>
			<div>
				<div style={{ width: '83%', paddingBottom: '3rem', margin: '0 auto' }}>
					<Button
						variant='contained'
						style={{
							background: 'rgba(39, 174, 96, 1)',
							color: 'white',
							// marginTop: "0.8rem",
							padding: '1rem',
							//  width : '90%',
							// margin : '0 auto'
							display: 'flex',
							justifyContent: 'center',
						}}
						fullWidth
						type='submit'
						onClick={modalHandler}>
						Continue
					</Button>
				</div>
			</div>
		</div>
	);
};

export default DocumentUpload;

// <div className={styles.container}>
//   <div className={styles.header}>
//     <h3>Document upload</h3>
//   </div>

//   <div className={styles.wrapper}>
//     <div>
//       {" "}
//       <h4>Select the registration you have</h4>
//     </div>

//     <div
//       className={
//         isActive ? styles.isActiveSelectWrapper : styles.selectWrapper
//       }
//       onClick={changeActiveState}
//     >
//       <div className={styles.controlGroup}>
//      <div className={styles.selectedContent}><Radio {...controlProps("a")} color='success' /></div>
//         <div className={styles.selectContent}>
//         <h3 className={styles.selectHeader}>RC Document </h3>
//         <p className={styles.selectConten}>For Limited companies</p>
//       </div>
//       </div>

//       <div className={styles.controlGroup}>
//         <Radio {...controlProps("b")} color='success' />
//         <div className={styles.selectContentr}>
//         <h3 className={styles.selectHeader}>BN Document </h3>
//         <p className={styles.selectConten}>Business name ventures, etc.</p>
//       </div>
//       </div>

//     </div>

//     <div style={{ width: "91%", paddingBottom: "3rem", margin: "0 auto" }}>
//       <Button
//         variant='contained'
//         style={{
//           background: "rgba(39, 174, 96, 1)",
//           color: "white",
//           // marginTop: "0.8rem",
//           padding: "1rem",
//           //  width : '90%',
//           // margin : '0 auto'
//           display: "flex",
//           justifyContent: "center",
//         }}
//         fullWidth
//         type='submit'
//       >
//         Continue
//       </Button>
//     </div>
//   </div>
// </div>
