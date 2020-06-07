/** @format */

import React from "react";
import { withRouter } from "react-router-dom";

import "./App.css";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

import themeTickets from "./config/themeTickets";

function App(props) {
	return (
		<>
			<MuiThemeProvider theme={themeTickets}>{props.children}</MuiThemeProvider>
		</>
	);
}

export default withRouter(App);
