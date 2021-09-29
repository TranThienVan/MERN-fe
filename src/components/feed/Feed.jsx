import React, { useState, useEffect, useContext } from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import './feed.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector} from 'react-redux';
import api from '../../apiService';
import { authAction } from '../../redux/actions/auth.actions';

const Feed = ({ username }) => {
	const user = useSelector(state => state.auth.user)
	const posts = useSelector(state => state.auth.posts)
	const dispatch = useDispatch()
	useEffect(
		() => {
			dispatch(authAction.getPost({user, username}))
		},
		[ username, user?._id ]
	);

	return (
		<div className="feed">
			<div className="feedWrapper">
				{(!username || username === user?.username) && <Share />}
				{posts?.map((p) => <Post key={p._id} post={p} username={username}/>)}
			</div>
		</div>
	);
};

export default Feed;
