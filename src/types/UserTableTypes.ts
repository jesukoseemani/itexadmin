import { number, string } from 'yup/lib/locale';

export interface UserTableTypes {
	id: number | string;
	first_name: string;
	last_name: string;
	mobile_number: number | string;
	email_address: string;
	status: string;
	avatar: null | string;
	role: string;
	address: null | string;
	city: null | string;
	state: null | string;
	password_tries: number;
	account_locked_until: null | string | number;
	date_account_locked: null | string | number;
	date_created: string;
	password_expires_in: null | string;
	pin_expires_in: null | string;
}

export interface ActivityApiTypes {
	page: {
		total: number | string;
		size: number | string;
		total_page: number | string;
		current_page: number | string;
		previous_page: number | string;
		next_page: number | string;
		today_total: number | string;
		all_time_total: number | string;
		percent_change: number | string;
		today_date: string;
	};
	items: [
		{
			id: number | string;
			batch_id: number | string;
			customer_id: number | string;
			wallet_id: number | string;
			product_id: number | string;
			product: string;
			amount: number;
			fee: number;
			currency_id: number;
			rate_used: number;
			status_id: number;
			status: string;
			transaction_reference: string;
			payment_reference: string;
			currency: string | number;
			customer_email: string;
			payment_response_code: string | number;
			payment_response_message: string;
			narration: string;
			wallet_name: string;
			direction: string;
			date_created: string;
			date_updated: string;
		}
	];
}

export interface TransactionApiTypes {
	page: {
		total: number | string;
		size: number | string;
		total_page: number | string;
		current_page: number | string;
		previous_page: number | string;
		next_page: number | string;
		today_total: number | string;
		all_time_total: number | string;
		percent_change: number | string;
		today_date: string;
	};
	items: [
		{
			id: number | string;
			batch_id: number | string;
			customer_id: number | string;
			wallet_id: number | string;
			product_id: number | string;
			product: string;
			amount: number;
			fee: number;
			currency_id: number;
			rate_used: number;
			status_id: number;
			status: string;
			transaction_reference: string;
			payment_reference: string;
			currency: string | number;
			customer_email: string;
			payment_response_code: string | number;
			payment_response_message: string;
			narration: string;
			wallet_name: string;
			direction: string;
			date_created: string;
			date_updated: string;
		}
	];
}

export interface TransactionDetailApiTypes {
	page: {
		total: Number;
		size: Number;
		total_page: Number;
		current_page: Number;
		previous_page: Number;
		next_page: Number;
		today_total: Number;
		all_time_total: Number;
		percent_change: Number;
		today_date: string | number;
	};
	items: [
		{
			id: Number;
			batch_id: Number;
			agent_id: Number;
			wallet_id: Number;
			product_id: Number;
			product: string;
			amount: Number;
			fee: Number;
			currency_id: Number;
			rate_used: Number;
			status_id: Number;
			status: null | String;
			transaction_reference: string;
			payment_reference: string;
			currency: string;
			agent_email: string;
			payment_response_code: Number | string;
			payment_response_message: string;
			narration: null | String;
			wallet_name: string;
			direction: string;
			date_created: string;
			date_updated: string;
		}
	];
}

export interface ApiResTypes {
	page: {
		total: number | string;
		size: number | string;
		total_page: number | string;
		current_page: number | string;
		previous_page: number | string;
		next_page: number | string;
		today_total: number | string;
		all_time_total: number | string;
		percent_change: number | string;
		today_date: string;
	};
	items: [
		{
			id: number | string;
			first_name: string;
			last_name: string;
			mobile_number: string | number;
			email_address: string;
			status: string;
			avatar: null | string;
			role: string;
			address: null | string;
			city: null | string;
			state: null | string;
			password_tries: number;
			account_locked_until: null | string;
			date_account_locked: null | string;
			date_created: string;
			password_expires_in: null | string;
			pin_expires_in: null;
		}
	];
}

export interface UserProfApi {
	data: {
		id: number | string;
		first_name: string;
		last_name: string;
		mobile_number: string;
		email_address: string;
		status: string;
		avatar: null | string;
		role: string;
		address: null | string;
		city: null | string;
		state: null | string;
		password_tries: number | string;
		account_locked_until: null | string;
		date_account_locked: null | string;
		date_created: string;
		password_expires_in: null | string;
		pin_expires_in: null | string;
	};
	status: string;
	status_code: string;
	message: string;
}

export interface TransactionDProfApi {
	data: {
		id: number | string;
		first_name: string;
		last_name: string;
		mobile_number: string;
		email_address: string;
		status: string;
		avatar: null | string;
		role: string;
		address: null | string;
		city: null | string;
		state: null | string;
		password_tries: number | string;
		account_locked_until: null | string;
		date_account_locked: null | string;
		date_created: string;
		password_expires_in: null | string;
		pin_expires_in: null | string;
	};
	status: string;
	status_code: string;
	message: string;
}

export interface userProfileTransactionTypes {
	Id: number | string;
	date: string;
	type: string;
	amount: number;
	recipient: string;
	destination: string;
	device: string;
	status: string;
}

export interface activitysectionTypes {
	id: number | string;
	date: string;
	time: string;
	amount: number;
	avatar: null | string;
	status: string;
}

export interface earningsectionTypes {
	id: number | string;
	date: string;
	amount: number | string;
	merchant: string;
	service: string;
}

export interface vasActivityTypes {
	id: number | string;
	date: string;
	earnings: number | string;
	merchant: string;
	activity: string;
	commission: string;
}

export interface vasTransactionTypes {
	id: number | string;
	date: string;
	amount: number | string;
	merchant: string;
	provider: string;
	phone: number | string;
	network: string;
	payment_ref: number | string;
	status: string;
}

export interface vasServicesTypes {
	id: number | string;
	date_modified: string;
	date_added: string;
	title: string;
	description: string;
	provider: string;
	category: string;
	provider_fee: number | string;
}

export interface settingTypes {
	page: {
		total: number;
		size: number;
		total_page: number;
		current_page: number;
		previous_page: number;
		next_page: number;
		today_total: number;
		all_time_total: number;
		percent_change: number;
		today_date: string;
	};
	items: [
		{
			role: string;
			status_name: string;
			first_name: string;
			last_name: string;
			email_address: string;
			mobile_number: string;
			password: string;
			avatar: null | string;
			status: number;
			role_id: number;
			account_locked_until: null | string | number;
			date_locked: null | string | number;
			password_tries: number;
			id: number;
			date_created: string;
			date_updated: string;
		}
	];
}

export interface approvalsTypes {
	id: number | string;
	action: string;
	user_email: string;
	created_by: string;
	date_created: null | string;
	time_created: string;
}

export interface userlistTypes {
	id: number | string;

	first_name: string;
	last_name: string;
	status: null | string;
	email: string;
}

export interface transactionWalletTypes {
	id: number | string;
	date: string;
	transaction_type: string;
	status: null | string;
	amount: number;
	balance: number;
}

export interface walletTopUpTypes {
	id: number | string;
	date: string;
	target: string | number;
	country: string;
	operator_name: string;
	amount: number;
	status: null | string;
}

export interface TopUpLogTypes {
	id: number | string;
	system_ref: string;
	customer_ref: string;
	operator_ref: string;
	time: string;
	target: number;
	country: string;
	operator_name: string;
	amount: number;
	status: null | string;
}

export interface mainTransactionTypes {
	id: number | string;
	transaction_ref: string;
	time: string;
	transaction_type: string;
	amount: number;
	balance: number;
	narration: string;
	description: string;
}

export interface dashboardTableTypes {
	id: number | string;
	amount: number | string;
	count: number | string;
	percentage: number;
	status: string;
}

export interface RefundApiTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	transactions: [
		{
			transaction: {
				merchantreference: string | number;
				reference: string | number;
				linkingreference: string | number;
				added: string | number;
			};
			order: {
				amount: string | number;
				description: string;
				currency: string;
				fee: {};
			};
			source: {
				customer: {
					email: string;
				};
			};
			code: string | number;
			message: string;
		}
	];
	code: string;
	message: string;
}

export interface TransactionManagementApiTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	transactions: [
		{
			transaction: {
				merchantreference: string;
				reference: string;
				linkingreference: string;
				paymentmethod: string;
				added: string | number;
			};
			order: {
				amount: string | number;
				description: string;
				currency: string;
				country: string;
				fee: {};
			};
			source: {
				customer: {
					firstname: string;
					lastname: string;
					email: string;
					msisdn: string | number;
					card: {
						number: string | number;
						first6: string | number;
						last4: string | number;
						type: string;
					};
					device: {
						fingerprint: string | number;
						ip: string | number;
					};
					address: [];
				};
			};
			code: string | number;
			message: string;
			business: {
				email: string;
				phonenumber: string | number;
				tradingname: string;
				merchantcode: string;
				user: [
					{
						email: string;
						phonenumber: string;
						key: [
							{
								publickey: string | number;
							}
						];
					}
				];
				feesetup: [];
				limitsetup: [];
			};
		}
	];
	code: string;
	message: string;
}

export interface FilteredCode {
	transaction: {
		merchantreference: string | number;
		reference: string | number;
		linkingreference: string | number;
		paymentmethod: string;
		added: string | number;
	};
	order: {
		amount: string | number;
		description: string;
		currency: string;
		country: string;
		fee: {};
	};
	source: {
		customer: {
			firstname: string;
			lastname: string;
			email: string;
			msisdn: string | number;
			card: {};
			device: {
				fingerprint: string | number;
				ip: string | number;
			};
			address: [];
		};
	};
	code: string | number;
	message: string;
	business: {
		email: string;
		phonenumber: string | number;
		tradingname: string;
		merchantcode: string;
		user: [
			{
				email: string;
				phonenumber: string;
				key: [
					{
						publickey: string | number;
					}
				];
			}
		];
		feesetup: [];
		limitsetup: [];
	};
}

export interface DownloadRefundRes {
	code: string;
	message: string;
	transaction: {
		redirecturl: string;
	};
}

export interface GetProviderApiTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	providers: [
		{
			email: string;
			phonenumber: string | number;
			name: string;
			shortname: string;
			businesstype: string;
			country: string;
			currency: string;
			code: string | number;
			added: string;
			status: string | number;
			live: string;
			address: [
				{
					line1: string;
					line2: string;
					city: string;
					state: string;
					country: string;
				}
			];
			settlement: {
				account: [
					{
						type: string;
						bankcode: string | number;
						bankname: string;
						accountnumber: string | number;
						accountname: string;
						currency: string;
						country: string;
						added: string;
						status: string | number;
					}
				];
			};
			feesetup: [];
			settlementids: [];
		}
	];
	code: string;
	message: string;
}

export interface PendingProviderApiTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	providers: [
		{
			email: string;
			phonenumber: string | number;
			name: string;
			shortname: string;
			businesstype: string;
			country: string;
			currency: string;
			code: string | number;
			added: string;
			status: string | number;
			approved: string;
			live: string;
			actionid: string | number;
			address: [
				{
					line1: string;
					line2: string;
					city: string;
					state: string;
					country: string;
				}
			];
			settlement: {
				account: [
					{
						type: string;
						bankcode: string | number;
						bankname: string;
						accountnumber: string | number;
						accountname: string;
						currency: string;
						country: string;
						added: string;
						status: string | number;
					}
				];
			};
			activity: string;
			initiatedby: string;
			initiatedat: string;
			approvedby: string;
			approvedat: string;
			feesetup: [];
			settlementids: [];
		}
	];
	code: string;
	message: string;
}

export interface GetFees {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	providers: [
		{
			address: [];
			feesetup: [
				{
					providercode: number | string;
					providername: string;
					industrycategory: string;
					transactiontype: string;
					paymentmethod: string;
					transactionlocale: string;
					fees: [
						{
							type: number | string;
							setting: string;
							value: string;
							cap: string | number;
							min: string;
							currency: string | number;
						}
					];
				}
			];
			settlementids: [];
			acceptance: [];
		}
	];
	code: string;
	message: string;
}

export interface GetFeesApproval {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	providers: [
		{
			email: string;
			phonenumber: string | number;
			name: string;
			shortname: string;
			businesstype: string;
			country: string;
			currency: string;
			code: string;
			added: string;
			status: string | number;
			live: string;
			address: [
				{
					line1: string;
					line2: string;
					city: string;
					state: string;
					country: string;
				}
			];
			initiatedby: string;
			feesetup: [
				{
					approved: string | number;
					actionid: string | number;
					fees: [
						{
							type: string | number;
							setting: string;
							value: string;
							cap: string | number;
							min: string | number;
							currency: string;
						}
					];
					activity: string;
					initiatedat: string;
					approvedat: string;
				}
			];
			settlementids: [];
		}
	];
	code: string;
	message: string;
}

export interface GetLimits {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	businesses: [
		{
			account: {};
			identification: [];
			meta: [];
			address: [];
			user: [];
			feesetup: [];
			limitsetup: [
				{
					industrycategory: string;
					limittype: string;
					limitmode: string;
					transactiontype: string;
					paymentmethod: string;
					transactionlocale: string;
					limitsetting: string;
					minlimit: string | number;
					maxlimit: string | number;
					currency: string;
					cumulativetransactionlimit: string | number;
					frequency: string;
					initiatedat: string;
					initiatedby: string;
					approvedby: string;
					status: string | number;
				}
			];
		}
	];
	code: string;
	message: string;
}

export interface GetLimitsApproval {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	businesses: [
		{
			email: string;
			phonenumber: string | number;
			name: string;
			account: {
				type: string;
				subtype: string;
			};
			businesstype: string;
			businessindustrycategory: string;
			country: string;
			identification: [];
			meta: [];
			merchantcode: string | number;
			added: string | number;
			status: string;
			live: string;
			address: [];
			user: [];
			feesetup: [];
			limitsetup: [
				industrycategory: string,
				limittype: string,
				limitmode: string,
				transactiontype: string,
				authoption: string,
				paymentmethod: string,
				transactionlocale: string,
				limitsetting: string,
				minlimit: string,
				maxlimit: string,
				currency: string,
				cumulativetransactionlimit: string,
				frequency: string,
				initiatedat: string,
				initiatedby: string,
				approvedby: string,
				status: string | number
			];
		}
	];
	code: string;
	message: string;
}

export interface GetSettlements {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	settlements: [
		{
			settlementid: string | number;
			batchid: string | number;
			narration: string;
			tradingname: string;
			amount: number;
			currency: string;
			settlementtype: string;
			settlementbankcode: string;
			settlementaccountname: string;
			settlementaccountnumber: string;
			settlementaccounttype: string;
			settlementcountry: string;
			startedat: string;
			endedat: string;
			frombankcode: string;
			fromaccountnumber: string;
			uploaduniquereference: string;
			responsecode: string;
			responsemessage: string;
			status: number;
			approved: number;
			initiatedby: string;
			initiatedat: string;
			approvedby: string;
			approvedat: string;
		}
	];
	code: string;
	message: string;
}

export interface RefundApiTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	transactions: [
		{
			transaction: {
				merchantreference: string | number;
				reference: string | number;
				linkingreference: string | number;
				added: string | number;
			};
			order: {
				amount: string | number;
				description: string;
				currency: string;
				fee: {};
			};
			source: {
				customer: {
					email: string;
				};
			};
			code: string | number;
			message: string;
		}
	];
	code: string;
	message: string;
}

export interface TransactionManagementApiTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	transactions: [
		{
			transaction: {
				merchantreference: string;
				reference: string;
				linkingreference: string;
				paymentmethod: string;
				added: string | number;
			};
			order: {
				amount: string | number;
				description: string;
				currency: string;
				country: string;
				fee: {};
			};
			source: {
				customer: {
					firstname: string;
					lastname: string;
					email: string;
					msisdn: string | number;
					card: {
						number: string | number;
						first6: string | number;
						last4: string | number;
						type: string;
					};
					device: {
						fingerprint: string | number;
						ip: string | number;
					};
					address: [];
				};
			};
			code: string | number;
			message: string;
			business: {
				email: string;
				phonenumber: string | number;
				tradingname: string;
				merchantcode: string;
				user: [
					{
						email: string;
						phonenumber: string;
						key: [
							{
								publickey: string | number;
							}
						];
					}
				];
				feesetup: [];
				limitsetup: [];
			};
		}
	];
	code: string;
	message: string;
}

export interface FilteredCode {
	transaction: {
		merchantreference: string | number;
		reference: string | number;
		linkingreference: string | number;
		paymentmethod: string;
		added: string | number;
	};
	order: {
		amount: string | number;
		description: string;
		currency: string;
		country: string;
		fee: {};
	};
	source: {
		customer: {
			firstname: string;
			lastname: string;
			email: string;
			msisdn: string | number;
			card: {};
			device: {
				fingerprint: string | number;
				ip: string | number;
			};
			address: [];
		};
	};
	code: string | number;
	message: string;
	business: {
		email: string;
		phonenumber: string | number;
		tradingname: string;
		merchantcode: string;
		user: [
			{
				email: string;
				phonenumber: string;
				key: [
					{
						publickey: string | number;
					}
				];
			}
		];
		feesetup: [];
		limitsetup: [];
	};
}

export interface businessTransactiontabTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	transactions: [
		{
			transaction: {
				merchantreference: string;
				reference: string;
				authoption: string;
				paymentmethod: string;
				added: string;
			};
			order: {
				amount: string;
				description: string;
				currency: string;
				country: string;
				fee: {
					merchantbearsfee: string;
				};
			};
			source: {
				customer: {
					firstname: string;
					lastname: string;
					email: string;
					msisdn: string;
					card: {
						number: string;
						first6: string;
						last4: string;
						type: string;
					};
					device: {
						fingerprint: string;
						ip: string;
					};
					address: [];
				};
			};
			code: string;
			message: string;
			business: {
				email: string;
				phonenumber: string;
				tradingname: string;
				merchantcode: string;
				user: [
					{
						email: string;
						phonenumber: string;
						key: [
							{
								publickey: string;
							}
						];
					}
				];
				feesetup: [];
				limitsetup: [];
			};
		}
	];
	code: string;
	message: string;
}

export interface PendingComplianceTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	compliance: [
		{
			compliancestatus: string;
			businessstatus: string;
			reason: string;
			riskcategory: string;
			identification: [
				{
					type: string;
					number: string;
					url: string;
					added: string;
					status: string;
					verified: string;
				},
				{
					type: string;
					number: string;
					url: string;
					added: string;
					status: string;
					verified: string;
				},
				{
					type: string;
					number: string;
					url: string;
					added: string;
					status: string;
					verified: string;
				}
			];
			initiatedat: string;
			initiatedby: string;
			approvedby: string;
			actionid: string;
		}
	];
	code: string;
	message: string;
}

export interface trendTypes {
	trend: [
		{
			volume: number;
			value: number;
			hour: string;
			day: string;
			month: string;
			year: string;
		}
	];
	tpv: [
		{
			volume: number;
			value: number;
			revenue: number;
			currency: string;
		}
	];
	success: [
		{
			successful: number;
			failed: number;
			successfulpercent: number;
			failpercent: number;
			currency: string;
		}
	];
	code: string;
	message: string;
}

export interface progressSuccessTypes {
	transactions: [
		{
			chargetype: string;
			percent: number;
		}
	];
	code: string;
	message: string;
}

export interface BusinessTableApiTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	businesses: [
		{
			email: string;
			phonenumber: string;
			account: {
				type: string;
				subtype: string;
			};
			tradingname: string;
			businesstype: string;
			businessindustrycategory: string;
			country: string;
			identification: [
				{
					type: string;
					number: string;
					url: string;
					added: string;
					status: string;
					verified: string;
				}
			];
			meta: [
				{
					name: string;
					value: string;
				}
			];
			merchantcode: string;
			added: string;
			status: string;
			approved: string;
			live: string;
			address: [];
			settlement: {
				account: [
					{
						type: string;
						bankname: string;
						bankcode: string;
						accountnumber: string;
						accountname: string;
						isdefault: string;
						currency: string;
						country: string;
						added: string;
						status: string;
					}
				];
			};
			user: [
				{
					email: string;
					firstname: string;
					middlename: string;
					lastname: string;
					phonenumber: string;
					position: string;
					dateofbirth: string;
					country: string;
					timezone: string;
					identification: [];
					key: [];
					status: string;
					verified: string;
					lasttogglestatus: string;
					added: string;
					nin: null | string;
					bvn: null | string;
				}
			];
			feesetup: [];
			limitsetup: [];
		}
	];
	code: string;
	message: string;
}

export interface RefundApiTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	transactions: [
		{
			transaction: {
				merchantreference: string | number;
				reference: string | number;
				linkingreference: string | number;
				added: string | number;
			};
			order: {
				amount: string | number;
				description: string;
				currency: string;
				fee: {};
			};
			source: {
				customer: {
					email: string;
				};
			};
			code: string | number;
			message: string;
		}
	];
	code: string;
	message: string;
}

export interface TransactionManagementApiTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	transactions: [
		{
			transaction: {
				merchantreference: string;
				reference: string;
				linkingreference: string;
				paymentmethod: string;
				added: string | number;
			};
			order: {
				amount: string | number;
				description: string;
				currency: string;
				country: string;
				fee: {};
			};
			source: {
				customer: {
					firstname: string;
					lastname: string;
					email: string;
					msisdn: string | number;
					card: {
						number: string | number;
						first6: string | number;
						last4: string | number;
						type: string;
					};
					device: {
						fingerprint: string | number;
						ip: string | number;
					};
					address: [];
				};
			};
			code: string | number;
			message: string;
			business: {
				email: string;
				phonenumber: string | number;
				tradingname: string;
				merchantcode: string;
				user: [
					{
						email: string;
						phonenumber: string;
						key: [
							{
								publickey: string | number;
							}
						];
					}
				];
				feesetup: [];
				limitsetup: [];
			};
		}
	];
	code: string;
	message: string;
}

export interface FilteredCode {
	transaction: {
		merchantreference: string | number;
		reference: string | number;
		linkingreference: string | number;
		paymentmethod: string;
		added: string | number;
	};
	order: {
		amount: string | number;
		description: string;
		currency: string;
		country: string;
		fee: {};
	};
	source: {
		customer: {
			firstname: string;
			lastname: string;
			email: string;
			msisdn: string | number;
			card: {};
			device: {
				fingerprint: string | number;
				ip: string | number;
			};
			address: [];
		};
	};
	code: string | number;
	message: string;
	business: {
		email: string;
		phonenumber: string | number;
		tradingname: string;
		merchantcode: string;
		user: [
			{
				email: string;
				phonenumber: string;
				key: [
					{
						publickey: string | number;
					}
				];
			}
		];
		feesetup: [];
		limitsetup: [];
	};
}

export interface GetFeesApproval {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	providers: [
		{
			email: string;
			phonenumber: string | number;
			name: string;
			shortname: string;
			businesstype: string;
			country: string;
			currency: string;
			code: string;
			added: string;
			status: string | number;
			live: string;
			address: [
				{
					line1: string;
					line2: string;
					city: string;
					state: string;
					country: string;
				}
			];
			initiatedby: string;
			feesetup: [
				{
					approved: string | number;
					actionid: string | number;
					fees: [
						{
							type: string | number;
							setting: string;
							value: string;
							cap: string | number;
							min: string | number;
							currency: string;
						}
					];
					activity: string;
					initiatedat: string;
					approvedat: string;
				}
			];
			settlementids: [];
		}
	];
	code: string;
	message: string;
}

export interface GetLimitsApproval {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	businesses: [
		{
			email: string;
			phonenumber: string | number;
			name: string;
			account: {
				type: string;
				subtype: string;
			};
			businesstype: string;
			businessindustrycategory: string;
			country: string;
			identification: [];
			meta: [];
			merchantcode: string | number;
			added: string | number;
			status: string;
			live: string;
			address: [];
			user: [];
			feesetup: [];
			limitsetup: [
				industrycategory: string,
				limittype: string,
				limitmode: string,
				transactiontype: string,
				authoption: string,
				paymentmethod: string,
				transactionlocale: string,
				limitsetting: string,
				minlimit: string,
				maxlimit: string,
				currency: string,
				cumulativetransactionlimit: string,
				frequency: string,
				initiatedat: string,
				initiatedby: string,
				approvedby: string,
				status: string | number
			];
		}
	];
	code: string;
	message: string;
}

export interface businessTransactiontabTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	transactions: [
		{
			transaction: {
				merchantreference: string;
				reference: string;
				authoption: string;
				paymentmethod: string;
				added: string;
			};
			order: {
				amount: string;
				description: string;
				currency: string;
				country: string;
				fee: {
					merchantbearsfee: string;
				};
			};
			source: {
				customer: {
					firstname: string;
					lastname: string;
					email: string;
					msisdn: string;
					card: {
						number: string;
						first6: string;
						last4: string;
						type: string;
					};
					device: {
						fingerprint: string;
						ip: string;
					};
					address: [];
				};
			};
			code: string;
			message: string;
			business: {
				email: string;
				phonenumber: string;
				tradingname: string;
				merchantcode: string;
				user: [
					{
						email: string;
						phonenumber: string;
						key: [
							{
								publickey: string;
							}
						];
					}
				];
				feesetup: [];
				limitsetup: [];
			};
		}
	];
	code: string;
	message: string;
}

export interface PendingComplianceTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	compliance: [
		{
			compliancestatus: string;
			businessstatus: string;
			reason: string;
			riskcategory: string;
			identification: [
				{
					type: string;
					number: string;
					url: string;
					added: string;
					status: string;
					verified: string;
				},
				{
					type: string;
					number: string;
					url: string;
					added: string;
					status: string;
					verified: string;
				},
				{
					type: string;
					number: string;
					url: string;
					added: string;
					status: string;
					verified: string;
				}
			];
			initiatedat: string;
			initiatedby: string;
			approvedby: string;
			actionid: string;
		}
	];
	code: string;
	message: string;
}

export interface trendTypes {
	trend: [
		{
			volume: number;
			value: number;
			hour: string;
			day: string;
			month: string;
			year: string;
		}
	];
	tpv: [
		{
			volume: number;
			value: number;
			revenue: number;
			currency: string;
		}
	];
	success: [
		{
			successful: number;
			failed: number;
			successfulpercent: number;
			failpercent: number;
			currency: string;
		}
	];
	code: string;
	message: string;
}

export interface progressSuccessTypes {
	transactions: [
		{
			chargetype: string;
			percent: number;
		}
	];
	code: string;
	message: string;
}

export interface BusinessTableApiTypes {
	_metadata: {
		page: number;
		perpage: number;
		pagecount: number;
		totalcount: number;
		links: [];
	};
	businesses: [
		{
			email: string;
			phonenumber: string;
			account: {
				type: string;
				subtype: string;
			};
			tradingname: string;
			businesstype: string;
			businessindustrycategory: string;
			country: string;
			identification: [
				{
					type: string;
					number: string;
					url: string;
					added: string;
					status: string;
					verified: string;
				}
			];
			meta: [
				{
					name: string;
					value: string;
				}
			];
			merchantcode: string;
			added: string;
			status: string;
			approved: string;
			live: string;
			address: [];
			settlement: {
				account: [
					{
						type: string;
						bankname: string;
						bankcode: string;
						accountnumber: string;
						accountname: string;
						isdefault: string;
						currency: string;
						country: string;
						added: string;
						status: string;
					}
				];
			};
			user: [
				{
					email: string;
					firstname: string;
					middlename: string;
					lastname: string;
					phonenumber: string;
					position: string;
					dateofbirth: string;
					country: string;
					timezone: string;
					identification: [];
					key: [];
					status: string;
					verified: string;
					lasttogglestatus: string;
					added: string;
					bvn: null | string;
					nin: null | string;
				}
			];
			feesetup: [];
			limitsetup: [];
		}
	];
	code: string;
	message: string;
}
