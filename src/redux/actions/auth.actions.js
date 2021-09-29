import * as types from '../constants/auth.constants';

import api from '../../apiService';
import { toast } from 'react-toastify';

const register = ({ username, email, password }) => async (dispatch) => {
	dispatch({ type: types.AUTH_REGISTER_REQUEST, payload: null });
	try {
		const data = await api.post('/auth/register', { username, email, password }); // return a promise

		dispatch({ type: types.AUTH_REGISTER_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({ type: types.AUTH_REGISTER_FAILURE, payload: null });
	}
};

const login = ({ email, password }) => async (dispatch) => {
	dispatch({ type: types.AUTH_LOGIN_REQUEST, payload: null });
	try {
		const data = await api.post('/auth/login', { email, password }); // return a promise

		api.defaults.headers.common['Authorization'] = `Bearer ` + data.data.accessToken;
		localStorage.setItem('token', data.data.accessToken);
		dispatch({ type: types.AUTH_LOGIN_SUCCESS, payload: data.data.user });
	} catch (error) {
		dispatch({ type: types.AUTH_LOGIN_FAILURE, payload: null });
	}
};

const getMe = () => async (dispatch) => {
	dispatch({ type: types.AUTH_GETME_REQUEST, payload: null });
	try {
		const data = await api.get('/auth/me'); // return a promise

		dispatch({ type: types.AUTH_GETME_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({ type: types.AUTH_GETME_FAILURE, payload: null });
	}
};

const follow = ({ user, currentUser }) => async (dispatch) => {
	try {
		const data = await api.put('/users/' + user._id + '/follow', { userId: currentUser._id });
		dispatch({ type: types.FOLLOW, payload: data.data });
		dispatch(authAction.getMe());
	} catch (err) {
		console.log(err);
	}
};

// const unfollow = ({ user, currentUser }) => async (dispatch) => {
// 	try {
// 		const data = await api.put('/users/' + user._id + '/unfollow', { userId: currentUser._id });
// 		dispatch({ type: types.UNFOLLOW, payload: data.data });
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

const getCurrentUser = ({ user, username }) => async (dispatch) => {
	try {
		const res = await api.get(`/users?username=${username}`);

		if (user._id === res.data._id) {
			dispatch({ type: types.GET_ME_PROFILE, payload: res.data });
		} else {
			dispatch({ type: types.GET_CURRENT_USER, payload: res.data });
		}
	} catch (err) {
		console.log(err);
	}
};

const logout = () => async (dispatch) => {
	localStorage.clear();
	dispatch({ type: types.LOGOUT });
};

const getPost = ({username, user}) => async (dispatch)=>{
	try{
		const res = username
					? await api.get(`/posts/profile/${username}`)
					: await api.get(`posts/timeline/${user?._id}`);
		res?.data.sort((p1, p2) => {
			return new Date(p2.createdAt) - new Date(p1.createdAt);
		})
		dispatch({type:types.GET_ALL_POSTS, payload: res.data})
	} catch(err){
		console.log(err)
	}
}

export const authAction = {
	register,
	login,
	getMe,
	follow,
	getCurrentUser,
	logout,
	getPost
	// unfollow
};
