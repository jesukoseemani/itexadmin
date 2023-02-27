import React, { useState, useCallback, useMemo, useEffect } from 'react';
import styles from './BusinessModal.module.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import {
	openLoader,
	closeLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { InputLabel, TextField } from '@material-ui/core';
import Select from '../formUI/Select';
import { Divider } from '@mui/material';
import { closeModal } from '../../redux/actions/modal/modalActions';

interface userRoleTypes {
	modules: [
		{
			id: number;
			controllerName: string;
			description: string;
			moduleStatus: number;
			createdAt: string;
			updatedAt: null | string;
			deletedAt: null | string;
			isDeleted: boolean;
		}
	];
	code: string;
	message: string;
}

function PermissionModal({
	title,
	setBearer,
	id,
	target,
	link1,
	link2,
}: {
	title: string;
	setBearer: React.Dispatch<React.SetStateAction<boolean>>;
	id: number;
	target: string;
	link1?: string;
	link2?: string;
}) {
	const dispatch = useDispatch();

	const [accountTypes, setAccountTypes] = useState<any>();
	const [module, setModule] = useState<any>();

	const validate = Yup.object({
		modules: Yup.string().notRequired(),
		target: Yup.string().notRequired(),
	});
	const settlementOptions = [{ name: 'Super Admin' }, { name: 'Business' }];

	useEffect(() => {
		axios
			.get<any>(`${link1}/${id}`)
			.then((res) => {
				setAccountTypes(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		axios
			.get<any>(`/utility/modules`)
			.then((res) => {
				setModule(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	interface pes {
		id: number;
		title: string;
	}

	const [permission, setPermission] = useState<any>({});
	const [singleData, setSingleData] = useState<any>({});

	useEffect(() => {
		// if (accountTypes?.modules.length >= 0) {
		// 	const formulate = accountTypes?.modules?.reduce(
		// 		(memo: any, { id }: { id: number }) => {
		// 			memo[id] = true;
		// 			return memo;
		// 		},
		// 		{}
		// 	);
		// }
		setPermission(
			accountTypes?.modules?.reduce((memo: any, { id }: { id: number }) => {
				memo[id] = true;
				return memo;
			}, {})
		);
	}, [accountTypes]);

	useEffect(() => {
		console.log('ju', permission);
	}, [permission]);

	// memoize queries to avoid rerender
	const handlePermission = (id: any, title: any) => {
		setPermission((state: pes[]) => ({
			...state, // <-- copy previous state
			[id]: !state[id], // <-- update value by index key
		}));
	};

	return (
		<div
			style={{
				color: 'rgba(0, 0, 0, 1)',
				backgroundColor: '#ffffff',
				overflowY: 'hidden',
			}}>
			<Formik
				initialValues={{
					target,
				}}
				onSubmit={(values) => {
					dispatch(openLoader());

					axios
						.post(`${link2}`, {
							userId: id,
							modules: Object.keys(permission).map((n) => +n),
						})
						.then((res: any) => {
							dispatch(closeLoader());
							console.log('res:', res.data);
							dispatch(
								openToastAndSetContent({
									toastContent: res?.data?.message,
									toastStyles: {
										backgroundColor: 'green',
									},
								})
							);
							setBearer(true);
							dispatch(closeModal());
						})
						.catch((err: any) => {
							dispatch(closeLoader());
							dispatch(
								openToastAndSetContent({
									toastContent: err.message,
									toastStyles: {
										backgroundColor: 'red',
									},
								})
							);
						});
				}}>
				{(props) => (
					<div className={styles.signinContainer}>
						<div className={styles.account_wrap}>
							<h1 className={styles.account_h1}>{title}</h1>
						</div>
						<div className={styles.signupDiv}>
							<div className={styles.signUpContent}>
								<Form>
									<InputLabel>
										<span className={styles.formTitle}>name</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='target'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='target'
										variant='outlined'
										margin='normal'
										type='text'
										size='small'
										fullWidth
										disabled
									/>

									<div className={styles.listType}>
										<h3 className={styles.listType_h2}>Permissions</h3>
										<Divider />

										<div className={styles.permisions}>
											<div>
												{module?.modules?.map(({ id, controllerName }: any) => (
													<div
														onClick={() => handlePermission(id, controllerName)}
														className={styles.listType_wrap_permission}
														key={id}>
														<div className={styles.circle}>
															<div
																style={{
																	background:
																		permission && permission[id]
																			? 'green'
																			: 'white',
																}}
																className={styles.circle_inner}></div>
														</div>
														<h3 className={styles.listType_h3_permission}>
															{controllerName}
														</h3>
													</div>
												))}
											</div>
										</div>
									</div>

									<InputLabel className={styles.mt1}></InputLabel>
									<button
										style={{
											backgroundColor: '#27AE60',
											padding: '0.7rem',
											width: '100%',
											color: '#fff',
											border: 'none',
											borderRadius: '4px',
											cursor: 'pointer',
										}}
										type='submit'
										color='primary'>
										Save changes
									</button>
								</Form>
							</div>
						</div>
					</div>
				)}
			</Formik>
		</div>
	);
}

export default PermissionModal;
