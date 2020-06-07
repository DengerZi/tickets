import axios from "axios";

import config from "../config/secrets";

async function showAllTicketsAPI(token) {
	try {
		let response = await axios.get(
			config.APP_URL + config.APP_URI + config.APP_VERSION + "/tickets",
			{
				headers: config.headersAuth(token),
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

async function storeTicketAPI(token, query) {
	try {
		let response = await axios.post(
      config.APP_URL + config.APP_URI + config.APP_VERSION + '/tickets',
      query,
			{
				headers: config.headersAuth(token),
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

async function updateTicketAPI(token, ticketId, query) {
	try {
		let response = await axios.put(
      config.APP_URL + config.APP_URI + config.APP_VERSION + `/tickets/${ticketId}`,
      query,
			{
				headers: config.headersAuth(token),
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

async function deleteTicketAPI(token, ticketId) {
	try {
		let response = await axios.delete(
			config.APP_URL + config.APP_URI + config.APP_VERSION + `/tickets/${ticketId}`,
			{
				headers: config.headersAuth(token),
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

export { showAllTicketsAPI, storeTicketAPI, updateTicketAPI, deleteTicketAPI };