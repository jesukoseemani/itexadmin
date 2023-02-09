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
import AssessmentFee from '../views/FraudRiskManagement/AssessmentFee';
import CBFraudRatio from '../views/FraudRiskManagement/CBFraudRatio';
import CBFraudSummary from '../views/FraudRiskManagement/CBFraudSummary';
import ChargeBack from '../views/FraudRiskManagement/Chargeback';
import ChargebackDetails from '../views/FraudRiskManagement/ChargebackDetails';
import Sales from '../views/FraudRiskManagement/Sales';
import FraudMgtAuditTrail from '../views/FraudRiskManagement/AuditTrail';
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

export default function AppRoutes() {
	const dispatch = useDispatch();
	const { loadingState } = useSelector(
		(state) => state?.loadingStatePayReducer
	);

	const history = useHistory();
	const auth = useSelector((state) => state?.authPayReducer?.auth);
	const access_token = auth?.access_token;

	axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
	axios.defaults.baseURL = process.env.REACT_APP_ROOT_URL;

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
								component={BusinessDetails}
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
								path='/compliance/:id'
								component={ComplianceDetails}
								AuthUser={loadingState}
							/>

							<ProtectedRoute
								exact
								path='/legal'
								component={Legal}
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
								path='/fraudmgt_sales'
								component={Sales}
								AuthUser={loadingState}
							/>

							<ProtectedRoute
								exact
								path='/fraudmgt/chargeback'
								component={ChargeBack}
								AuthUser={loadingState}
							/>

							<ProtectedRoute
								exact
								path='/fraudmgt/chargeback/:id'
								component={ChargebackDetails}
								AuthUser={loadingState}
							/>

							<ProtectedRoute
								exact
								path='/fraudmgt/fraud_summary'
								component={CBFraudSummary}
								AuthUser={loadingState}
							/>

							<ProtectedRoute
								exact
								path='/fraudmgt/fraud_ratio'
								component={CBFraudRatio}
								AuthUser={loadingState}
							/>

							<ProtectedRoute
								exact
								path='/fraudmgt/fraud_assessment_fee'
								component={AssessmentFee}
								AuthUser={loadingState}
							/>

							<ProtectedRoute
								exact
								path='/fraudmgt/audittrail'
								component={FraudMgtAuditTrail}
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
						</>
					</Switch>
				</div>
			</ParentContainer>
		</Router>
	);
}
