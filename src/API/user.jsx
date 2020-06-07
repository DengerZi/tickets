import axios from "axios";

import config from "../config/secrets";

async function getUsersAPI() {
	try {
		let response = await axios.get(
      config.APP_URL + config.APP_URI + config.APP_VERSION + '/users',
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

export { getUsersAPI };