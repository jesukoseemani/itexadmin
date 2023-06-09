import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Styles from './AppRoutes.module.scss';
import ParentContainer from '../components/ParentContainer/ParentContainer';
import Drawer from '../components/drawer/Drawer';
import AdminOverview from '../views/AdminOverview/AdminOverview';
import Businesses from '../views/Businesses/Businesses';
import TransactionManagement from '../views/TransactionManagement/TransactionManagement';
import TransactionDetails from '../views/TransactionManagement/TransactionDetails';
import Providers from '../views/FeesAndLimits/Providers';
import Approvals from '../views/FeesAndLimits/Approvals';
import Fees from '../views/FeesAndLimits/Fees';
import WalletManagement from '../views/WalletManagement/WalletManagement';
import WalletDetails from '../views/WalletManagement/WalletDetails';
import DebitDetails from '../views/WalletManagement/DebitDetails';
import Report from '../views/Settlement/Report';
import Settlements from '../views/Settlement/Settlements';
import SettlementDetails from '../views/Settlement/SettlementDetails';
import ReviewedSettlementDetails from '../views/Settlement/ReviewedSettlementsDetails';
import FailedSettlementDetails from '../views/Settlement/FailedSettlementsDetails';
import ReportDetails from '../views/Settlement/ReportDetails';
import SettlementPendingApproval from '../views/Settlement/SettlementPendingApproval';
import Reconciliations from '../views/Settlement/Reconciliations';
import AllCompliance from '../views/Compliance/AllCompliance';
import Legal from '../views/Legal/Legal';
import POS from '../views/PointOfSale/POS';
import AllChargebacks from '../views/ChargebackManagement/AllChargebacks';
import Refunds from '../views/ChargebackManagement/Refunds';
import Roles from '../views/UsersAndPermissions/Roles';
import AuditTrail from '../views/UsersAndPermissions/AuditTrail';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from '../components/ProtectedRoutes';
import SignIn from '../views/SignIn/SignIn';
import AccountType from '../components/accountSetUp/AccountType';
import LoginPasswordReset from '../components/accountSetUp/LoginPasswordReset';
import EmailVerification from '../components/accountSetUp/EmailVerification';
import NewPassword from '../components/accountSetUp/NewPassword';
import Users from '../views/UsersAndPermissions/Users';
import Limits from '../views/FeesAndLimits/Limits';
import BusinessDetails from '../components/businessDetails/BusinessDetails';
import ComplianceDetails from '../components/complianceDetails/ComplianceDetails';
import UploadChargeback from '../views/ChargebackManagement/UploadChargeback';
import EmailTemplate from '../components/emailTemplates/EmailTemplate';
import ForgotPassword from '../components/emailTemplates/ForgotPassword';
import MerchantTransaction from '../components/emailTemplates/MerchantTransaction';
import CustomerTransaction from '../components/emailTemplates/CustomerTransaction';
import LegalDetails from '../components/legalDetails/LegalDetails';
import axios from 'axios';
import { openToastAndSetContent } from '../redux/actions/toast/toastActions';
import { useHistory } from 'react-router';
import { logOut } from '../redux/actions/auth/authActions';
import { saveLoading } from '../redux/actions/loadingState/loadingStateActions';
import Bank from '../views/Bank/Bank';
import BankDetails from '../components/bankDetails/BankDetails';
import ResetCompletePassword from '../components/accountSetUp/ResetCompletePassword';
import Modules from '../views/UsersAndPermissions/Modules';
import BusinessTab from '../components/businessDetails/BusinessTab';
import ChargebackNDetails from '../views/ChargebackManagement/ChargebackDetails';
import ChargebackDetailsNew from '../views/ChargebackManagement/ChargebackDetails';
import Account from '../views/Account/Account';
import Customermgt from '../views/customer/Customermgt';
import CustomerDetails from '../views/customer/CustomerDetails';
import RollingReserve from '../views/rollingReserve/RollingReserve';
import FeeCompliance from '../views/Compliance/FeeCompliance';
import LimitCompliance from '../views/Compliance/LimitCompliance';
import ScheduleCompliance from '../views/Compliance/ScheduleCompliance';
import ConfigCompliance from '../views/Compliance/ConfigCompliance';
import DueSettlements from '../views/Settlement/DueSettlement';
import Fraudmgt from '../views/FraudRiskManagement/Fraudmgt';
import Hotlist from '../views/FraudRiskManagement/Hotlist';
import FraudDetails from '../views/FraudRiskManagement/FraudDetails';
import Marketingmgt from '../views/marketing/Marketingmgt';
import LogDetails from '../views/marketing/LogDetails';
import Payoutmgt from '../views/payout/Payoutmgt';
import PayoutDetails from '../views/payout/PayoutDetails';
import PaymentLink from '../views/payment/PaymentLink';
import PaymentDetails from '../views/payment/PaymentDetails';
import MerchantInvoice from '../views/payment/MerchantInvoice';
import InvoiceDetails from '../views/payment/InvoiceDetails';
import CountryList from '../views/utility/CountryList';
import CategoryList from '../views/utility/CategoryList';
import WealthTab from '../views/wealth/WealthTab';
import WealthBalance from '../views/wealth/WealthBalance';

export default function AppRoutes() {
	const dispatch = useDispatch();
	const { loadingState } = useSelector(
		(state) => state?.loadingStatePayReducer
	);

	const history = useHistory();
	const auth = useSelector((state) => state?.authPayReducer?.auth);
	const access_token = auth?.access_token;

	console.log('access_token:', access_token);

	axios.defaults.headers.common.authorization = `Bearer ${access_token}`;
	axios.defaults.baseURL = process.env.REACT_APP_ROOT_URL;
	// axios.defaults.headers.post['Content-Type'] = 'application/json';
	// axios.defaults.headers.delete['Content-Type'] = 'application/json';
	// axios.defaults.headers.get['Content-Type'] = 'application/json';

	axios?.interceptors?.response?.use(
		(response) => {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		(error) => {
			const { message } = error.response.data;
			if (error.response) {
				dispatch(
					openToastAndSetContent({
						toastContent: message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			} else if (error.request) {
				console.log('sorry, there was an error');
			} else {
				dispatch(
					openToastAndSetContent({
						toastContent: error.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			}
			// handle expired token
			if (
				error?.response?.status === 401 ||
				message?.toLowerCase() === 'login again'
			) {
				dispatch(
					openToastAndSetContent({
						toastContent: 'Token Expired',
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
				localStorage.clear();
				dispatch(logOut());
				dispatch(saveLoading(false));
				history.push('/signIn');
			} else {
				return Promise.reject(error);
			}
		}
	);
	return (
		<Router>
			<ParentContainer>
				<Drawer />
				<div
					className={Styles.wrap}
				// style={{
				// 	flex: '1',
				// 	width: '100%',
				// 	overflowX: 'scroll',
				// 	backgroundColor: '#EFF3F7',
				// }}
				>
					<Switch>
						<Route exact path='/signin'>
							<SignIn />
						</Route>
						<Route exact path='/account_type'>
							<AccountType />
						</Route>
						<Route exact path='/forgotpassword'>
							<LoginPasswordReset />
						</Route>
						<Route exact path='/newpassword'>
							<NewPassword />
						</Route>
						<Route exact path='/email_verification'>
							<EmailVerification />
						</Route>
						<Route exact path='/reset-password'>
							<ResetCompletePassword />
						</Route>
						<>
							<ProtectedRoute
								exact
								path='/'
								component={AdminOverview}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/businesses'
								component={Businesses}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/businesses/:id'
								component={BusinessTab}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/transactionmgt'
								component={TransactionManagement}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/transactionmgt/:id'
								component={TransactionDetails}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/fees'
								component={Fees}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/fees/limits'
								component={Limits}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/fees/providers'
								component={Providers}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/fees/approvals'
								component={Approvals}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/walletmgt/:id'
								component={WalletDetails}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/walletmgt/debit/:id'
								component={DebitDetails}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/settlements'
								component={Settlements}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/settlements/due'
								component={DueSettlements}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/settlement/:id'
								component={SettlementDetails}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/reviewed_settlement/:id'
								component={ReviewedSettlementDetails}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/failed_settlement/:id'
								component={FailedSettlementDetails}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/settlement_report/:id'
								component={ReportDetails}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/settlements/reconciliation'
								component={Reconciliations}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/settlements/pending_approval'
								component={SettlementPendingApproval}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/walletmgt'
								component={WalletManagement}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/pos'
								component={POS}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/compliance'
								component={AllCompliance}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/compliance/fees'
								component={FeeCompliance}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/compliance/limit'
								component={LimitCompliance}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/compliance/schedule'
								component={ScheduleCompliance}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/compliance/config'
								component={ConfigCompliance}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/bank'
								component={Bank}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/bank/:id'
								component={BankDetails}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/compliance/business/:id'
								component={ComplianceDetails}
								AuthUser={loadingState}
							/>

							<ProtectedRoute
								exact
								path='/legal'
								component={Legal}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/customermgt'
								component={Customermgt}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/customer/:id'
								component={CustomerDetails}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/rollingreserve'
								component={RollingReserve}
								AuthUser={loadingState}
							/>


							{/* <ProtectedRoute
              exact
              path="/legal/partners_banks"
              component={PartnersBanksProvider}
              AuthUser={loadingState}
            /> */}



							<ProtectedRoute
								exact
								path='/fraudmgt'
								component={Fraudmgt}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/fraudmgt/:id'
								component={FraudDetails}
								AuthUser={loadingState}
							/>

							<ProtectedRoute
								exact
								path='/hotlist'
								component={Hotlist}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/chargebackmgt'
								component={AllChargebacks}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/chargebackmgt/:id'
								component={ChargebackDetailsNew}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/refunds'
								component={Refunds}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/chargebackmgt/upload'
								component={UploadChargeback}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/marketingmgt'
								component={Marketingmgt}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/logs/:id'
								component={LogDetails}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/payout'
								component={Payoutmgt}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/payout/:id'
								component={PayoutDetails}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/paymentlinks'
								component={PaymentLink}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/paymentlinks/:id'
								component={PaymentDetails}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/merchantinvoice'
								component={MerchantInvoice}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/merchantinvoice/:id'
								component={InvoiceDetails}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/usersandpermissions'
								component={Users}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/usersandpermissions/roles'
								component={Roles}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/usersandpermissions/modules'
								component={Modules}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/usersandpermissions/audittrail'
								component={AuditTrail}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/email'
								component={EmailTemplate}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/forgotPass'
								component={ForgotPassword}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/customer'
								component={CustomerTransaction}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/merchant'
								component={MerchantTransaction}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/account'
								component={Account}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/countrylist'
								component={CountryList}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/categorylist'
								component={CategoryList}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/summary'
								component={WealthTab}
								AuthUser={loadingState}
							/>
							<ProtectedRoute
								exact
								path='/wealth/balance'
								component={WealthBalance}
								AuthUser={loadingState}
							/>
						</>
					</Switch>
				</div>
			</ParentContainer>
		</Router>
	);
}
