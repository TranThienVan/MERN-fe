import React, { useEffect } from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import './profile.css';
import { useParams } from 'react-router';
import api from '../../apiService';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../redux/actions/auth.actions';
import { AddAPhoto } from '@material-ui/icons';
import { AddPhotoAlternate } from '@material-ui/icons';

const Profile = () => {
	// Folder URL (assets)
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const username = useParams().username;

	const currentUser = useSelector((state) => state.auth.currentUser);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	// Fetch username
	useEffect(
		() => {
			dispatch(authAction.getCurrentUser({ user, username }));
		},
		[ username ]
	);

	// Cloudinary
	const myWidgetCover = window.cloudinary.createUploadWidget(
		{
			cloudName: 'dai677yec',
			uploadPreset: 'vandeptrai'
		},
		(error, result) => {
			if (!error && result && result.event === 'success') {
				console.log('Done! Here is the image info: ', result.info);
				const changeCover = async () => {
					const res = await api.put('/users/me', {
						coverPicture: result.info.url
					})
					dispatch(authAction.getMe())
				}
				changeCover()
				// setProfile({ ...profile, avatarUrl: result.info.url });
			}
		}
	);
	
	//change avatar
	const myWidgetAvatar = window.cloudinary.createUploadWidget(
		{
			cloudName: 'dai677yec',
			uploadPreset: 'vandeptrai'
		},
		(error, result) => {
			if (!error && result && result.event === 'success') {
				console.log('Done! Here is the image info: ', result.info);
				const changeProfile = async () => {
					const res = await api.put('/users/me', {
						profilePicture: result.info.url
					})
					dispatch(authAction.getMe())
				}
				changeProfile()
				// setProfile({ ...profile, avatarUrl: result.info.url });
			}
		}
	);

	// HandleCover
	const handleChangeCover = () => {
		myWidgetCover.open()
	}

	// HandleCover
	const handleChangeAvatar = () => {
		myWidgetAvatar.open()
	}

	return (
		<div>
			<Topbar />
			<div className="profile">
				<Sidebar />
				{currentUser?._id && currentUser?._id !== user?._id ? (
					<div className="profileRight">
						<div className="profileRightTop">
							<div className="profileCover">
								<img
									className="profileCoverImg"
									src={
										currentUser.coverPicture ? (
											currentUser.coverPicture
										) : (
											PF + 'person/noCover.png'
										)
									}
									alt=""
								/>
								<img
									className="profileUserImg"
									src={
										currentUser.profilePicture ? (
											currentUser.profilePicture
										) : (
											PF + 'person/noAvatar.png'
										)
									}
									alt=""
								/>
								
							</div>
							<div className="profileInfo">
								<h4 className="profileInfoName">{currentUser.username}</h4>
								<span className="profileInfoDesc">{currentUser.desc}</span>
							</div>
						</div>
						<div className="profileRightBottom">
							<Feed username={username} />
							<Rightbar />
						</div>
					</div>
				) : (
					<div className="profileRight">
						<div className="profileRightTop">
							<div className="profileCover">
								<img
									className="profileCoverImg"
									src={user?.coverPicture ? user.coverPicture : PF + 'person/noCover.png'}
									alt=""
								/>
								<div style={{position:'relative', width:'150px', height:'100%', margin:'auto'}}>
									<img
										className="profileUserImg"
										src={user?.profilePicture ? user.profilePicture : PF + 'person/noAvatar.png'}
										alt=""
									/>
									<div style={{position:'absolute', right:'0', bottom:'1.5rem'}}>
										<AddAPhoto className="avatarButton" onClick={handleChangeAvatar} style={{ borderRadius: "50%", cursor:"pointer"}}/>
									</div>
									
								</div>
								
								<AddPhotoAlternate htmlColor="white" className="coverButton" onClick={handleChangeCover}/>
								{/* <button className="coverButton" onClick={handleChangeCover}>Change cover </button> */}
								{/* <button className="avatarButton" onClick={handleChangeAvatar}>Change avatar </button> */}
							</div>
							<div className="profileInfo">
								<h4 className="profileInfoName">{user?.username}</h4>
								<span className="profileInfoDesc">{user?.desc}</span>
							</div>
						</div>
						<div className="profileRightBottom">
							<Feed username={username} />
							<Rightbar />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
