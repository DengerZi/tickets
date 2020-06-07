/** @format */

import React from "react";
import { Route, Redirect } from "react-router-dom";

import FullPageLayout from "../fullPageLayout";

const FullPageLayoutPrivateRoute = ({ render, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(matchProps) =>
				localStorage.getItem('token') ? (
          <FullPageLayout>{render(matchProps)}</FullPageLayout>
				) : (
					<Redirect
						to={{
							pathname: '/login',
						}}
					/>
				)
			}
		/>
	);
};

export default FullPageLayoutPrivateRoute;
