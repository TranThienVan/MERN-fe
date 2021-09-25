import React, { useEffect, useState } from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import './profile.css';
import axios from 'axios';

import { useParams } from 'react-router';

const Profile = () => {
	// Folder URL (assets)
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const [ user, setUser ] = useState({});

	const username = useParams().username;

	// Cloudinary
	const myWidget = window.cloudinary.createUploadWidget(
		{
			cloudName: 'dai677yec',
			uploadPreset: 'vandeptrai'
		},
		(error, result) => {
			console.log(error);
			if (!error && result && result.event === 'success') {
				console.log('Done! Here is the image info: ', result.info);
				// setProfile({ ...profile, avatarUrl: result.info.url });
			}
		}
	);

	useEffect(
		() => {
			const fetchUser = async () => {
				const res = await axios.get(`/users?username=${username}`);

				setUser(res.data);
			};
			fetchUser();
		},
		[ username ]
	);
	console.log(username);

	return (
		<div>
			<Topbar />
			<div className="profile">
				<Sidebar />
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								className="profileCoverImg"
								src={user.coverPicture ? PF + user.coverPicture : PF + 'person/noCover.png'}
								alt=""
							/>
							<img
								className="profileUserImg"
								src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'}
								alt=""
							/>
							<button onClick={() => myWidget.open()}>Open widget </button>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">{user.username}</h4>
							<span className="profileInfoDesc">{user.desc}</span>
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed username={username} />
						<Rightbar user={user} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
