import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ AuthUser, component: Component, ...rest }:any) => (
	<Route
		{...rest}
		render={(props) =>
			AuthUser ? (
				<Component />
			) : (
				<Redirect
					to={{ pathname: '/signIn', state: { from: props.location } }}
				/>
			)
		}
	/>
);

export default ProtectedRoute;
