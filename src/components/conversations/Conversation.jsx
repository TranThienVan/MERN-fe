import React, { useEffect, useState } from 'react';
import api from '../../apiService';
import './conversation.css';

const Conversation = ({ conversation, currentUser }) => {
	const [ user, setUser ] = useState(null);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	useEffect(
		() => {
			const friendId = conversation.members.find((m) => m !== currentUser._id);

			const getUser = async () => {
				try {
					const res = await api('/users?userId=' + friendId);
					setUser(res.data);
				} catch (err) {
					console.log(err);
				}
			};
			getUser();
		},
		[ currentUser, conversation ]
	);

	return (
		<div className="conversation">
			<img
				src={user?.profilePicture ? user.profilePicture : PF + 'person/noAvatar.png'}
				alt=""
				className="conversationImg"
			/>
			<span className="conversationName">{user?.username}</span>
		</div>
	);
};

export default Conversation;
