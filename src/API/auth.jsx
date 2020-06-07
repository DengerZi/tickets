import axios from "axios";

import config from "../config/secrets";

async function signUpAPI(query) {
	try {
		let response = await axios.post(
			config.APP_URL + config.APP_URI + config.APP_VERSION + "/users/register",
			query,
			{
				headers: config.headers,
			},
		);

		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		} else if (error.request) {
			const response = {
				success: false,
				code: 102,
			};
			return response;
		} else {
			const response = {
				success: false,
				code: 10,
			};
			return response;
		}
	}
}

async function loginAPI(query) {
	try {
		let response = await axios.post(
			config.APP_URL + config.APP_URI + config.APP_VERSION + "/users/login",
			query,
			{
				headers: config.headers,
			},
		);

		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		} else if (error.request) {
			const response = {
				success: false,
				code: 102,
			};
			return response;
		} else {
			const response = {
				success: false,
				code: 10,
			};
			return response;
		}
	}
}

export { signUpAPI, loginAPI };