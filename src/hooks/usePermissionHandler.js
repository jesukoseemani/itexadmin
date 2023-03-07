import { useSelector } from 'react-redux';

const usePermissionHandler = () => {
	const { userPermissions } = useSelector((state) => state.Auth);

	const ASSIGN_PERMISSIONS = userPermissions.hasOwnProperty(
		'ASSIGN_PERMISSIONS'
	)
		? userPermissions.ASSIGN_PERMISSIONS
		: true;

	const CHANGE_KYC_STATUS = userPermissions.hasOwnProperty('CHANGE_KYC_STATUS')
		? userPermissions.CHANGE_KYC_STATUS
		: true;

	return {
		ASSIGN_PERMISSIONS,
		CHANGE_KYC_STATUS,
	};
};

export default usePermissionHandler;
