import * as types from '../constants/auth.constants';

// !!
const isAuthenticated = !!localStorage.getItem('token');

const initialState = {
	user: {},
	isAuthenticated,
	currentUser: {},
	posts: []
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		// REGISTER
		case types.AUTH_REGISTER_REQUEST:
		case types.AUTH_REGISTER_SUCCESS:
		case types.AUTH_REGISTER_FAILURE:

		// LOGIN
		case types.AUTH_LOGIN_REQUEST:
		case types.AUTH_LOGIN_SUCCESS:
			return { ...state, user: payload, currentUser: payload, isAuthenticated: true };
		case types.AUTH_LOGIN_FAILURE:

		// GET ME
		case types.AUTH_GETME_REQUEST:
			return state;
		case types.AUTH_GETME_SUCCESS:
			return { ...state, user: payload };
		case types.GET_ME_PROFILE:
			return { ...state, currentUser: payload };
		case types.AUTH_GETME_FAILURE:
			return state;
		// FOLLOW / UNFOLLOW
		case types.FOLLOW:
			return {
				...state,
				currentUser: payload.currentUser
			};
		case types.GET_CURRENT_USER:
			return {
				...state,
				currentUser: payload
			};
		case types.LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				user: {},
				currentUser: {}
			};
		case types.GET_ALL_POSTS:
			return {
				...state,
				posts: payload
			};

		// case types.UNFOLLOW:
		// 	return {
		// 		...state,
		// 		user: {
		// 			...state.user,
		// 			followings: state.user.followings.filter((following) => following !== action.payload)
		// 		}
		// 	};
		default:
			return state;
	}
};

export default authReducer;
