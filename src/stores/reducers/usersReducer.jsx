/** @format */

const initialState = {
	jwt: null,
	user: null,
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case "LOG_IN":
			return {
				...state,
				jwt: action.jwt,
			};
		case "LOG_OUT":
			return {};
		case "LOAD_USER":
			return {
				...state,
				user: {
					name: action.user.name,
					_id: action.user._id,
					email: action.user.email,
					roleId: action.user.roleId,
				},
			};
		default:
			return state;
	}
}
