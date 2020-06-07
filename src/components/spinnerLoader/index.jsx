/** @format */

import React from "react";

import styleCSS from "./style";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

function SpinnerLoader() {
	const classes = styleCSS();

	return (
		<>
			<Backdrop className={classes.backdrop} open={true}>
				<CircularProgress color='inherit' />
			</Backdrop>
		</>
	);
}

export default SpinnerLoader;
