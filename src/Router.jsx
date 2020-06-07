/** @format */

import React, { Suspense } from "react";
import { Router as ReactRouter, Switch } from "react-router-dom";

import Spinner from "./components/spinnerLoader";
import App from "./App";
import { history } from "./utils/history";

import FullPageSessionLayout from "./layouts/routes/fullPageSessionRoutes";
import FullPagePrivateLayout from "./layouts/routes/fullPagePrivateRoutes";

const Login = React.lazy(() => import("./container/Login"));
const SignUp = React.lazy(() => import("./container/SignUp"));
const AdminHome = React.lazy(() => import("./container/AdminHome"));
const UserHome = React.lazy(() => import("./container/UserHome"));

function Router() {
	return (
		<ReactRouter history={history}>
			<Switch>
				<App>
					<FullPageSessionLayout
						exact
						path='/login'
						render={(matchprops) => (
							<Suspense fallback={<Spinner />}>
								<Login {...matchprops} />
							</Suspense>
						)}
					/>
					<FullPageSessionLayout
						exact
						path='/signup'
						render={(matchprops) => (
							<Suspense fallback={<Spinner />}>
								<SignUp {...matchprops} />
							</Suspense>
						)}
					/>
					<FullPagePrivateLayout
						exact
						path='/admin'
						render={(matchprops) => (
							<Suspense fallback={<Spinner />}>
								<AdminHome {...matchprops} />
							</Suspense>
						)}
					/>
					<FullPagePrivateLayout
						exact
						path='/'
						render={(matchprops) => (
							<Suspense fallback={<Spinner />}>
								<UserHome {...matchprops} />
							</Suspense>
						)}
					/>
				</App>
			</Switch>
		</ReactRouter>
	);
}

export default Router;
