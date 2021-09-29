import React, { useContext, useEffect, useState } from 'react';
import './rightbar.css';
import Online from '../online/Online';
import axios from 'axios';
import { Users } from '../../dummyData';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import api from '../../apiService';
import { authAction } from '../../redux/actions/auth.actions';
import { useDispatch } from 'react-redux';


const Rightbar = () => {
	// Folder URL (assets)
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [ friends, setFriends ] = useState([]);
	// const { user: currentUser } = useContext(AuthContext);

	const user = useSelector(state => state.auth.user)
	const currentUser = useSelector(state => state.auth.currentUser)
	
	const followed = user?.followings?.includes(currentUser?._id);

	const dispatch = useDispatch()
	
	const location = useLocation()


	useEffect(
		() => {
			const getFriends = async ({user}) => {
				try {
					const friendList = await api.get('/users/friends/' + user?._id);
					setFriends(friendList.data);
				} catch (err) {
					console.log(err);
				}
			};
			if(currentUser?._id && currentUser?._id !== user?._id) {
				getFriends({user:currentUser});
			} else {
				getFriends({user})
			}
		},
		[ currentUser ]
	);

	// const handleClick = async () => {
	// 	try {
	// 		if (followed) {
	// 			await api.put('/users/' + currentUser._id + '/unfollow', { userId: user._id });
	// 			dispatchEvent({ type: 'UNFOLLOW', payload: currentUser._id });
	// 		} else {
	// 			await api.put('/users/' + currentUser._id + '/follow', { userId: user._id });
	// 			dispatchEvent({ type: 'FOLLOW', payload: currentUser._id });
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// 	setFollowed(!followed);
	// };

	const handleClick = async () => {
		try {
		
			dispatch(authAction.follow({currentUser, user}))
			
		} catch (err) {
			console.log(err);
		}
	};

	const HomeRightbar = () => {
		return (
			<div>
				<div className="birthdayContainer">
					<img src="assets/gift.png" alt="" className="birthdayImg" />
					<span className="birthdayText">
						<b>Thien Van</b> and <b>3 other friends</b> have a birday today.
					</span>
				</div>
				<img className="rightbarAd" src="assets/ad.png" alt="" />
				<img className="rightbarAd" src="https://doomshop.xyz/wp-content/uploads/2019/04/quangcao7.jpg" alt="" />
				<h4 className="rightbarTitle">Online Friends</h4>
				<ul className="rightbarFriendList">{Users.map((u) => <Online key={u.id} user={u} />)}</ul>
			</div>
			
		);
	};

	const ProfileRightbar = () => {
		return (
			<div>
					<div>
						{currentUser?._id !==user?._id? (<button className="rightbarFollowButton" onClick={handleClick}>
							{followed ? 'Unfollow' : 'Follow'}
							{followed ? <Remove /> : <Add />}
						</button>):(<div/>)}
						
						<h4 className="rightbarTitle">User information</h4>
						<div className="rightbarInfo">
							<div className="rightbarInfoItem">
								<span className="rightbarInfoKey">City:</span>
								<span className="rightbarInfoValue">{currentUser?.city}</span>
							</div>
							<div className="rightbarInfoItem">
								<span className="rightbarInfoKey">From:</span>
								<span className="rightbarInfoValue">{currentUser?.from}</span>
							</div>
							<div className="rightbarInfoItem">
								<span className="rightbarInfoKey">Relationship:</span>
								<span className="rightbarInfoValue">
									{currentUser?.relationship === 1 ? 'Single' : currentUser?.relationship === 2 ? 'Married' : '-'}
								</span>
							</div>
						</div>
					</div>
			
				
				<h4 className="rightbarTitle">Followings</h4>
				<div className="rightbarFollowings">
					{friends.length && friends.map((friend) => (
						<Link to={'/profile/' + friend.username} style={{ color: 'black', textDecoration: 'none' }}>
							<div className="rightbarFollowing">
								<img
									src={
										friend.profilePicture ? friend.profilePicture : PF + 'person/noAvatar.png'
									}
									alt=""
									className="rightbarFollowingImg"
								/>
								<span className="rightbarFollowingName">{friend.username}</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className="rightbar">
			<div className="rightbarWrapper">{location.pathname==="/" ? <HomeRightbar />: <ProfileRightbar key={currentUser?._id} />  }</div>
		</div>
	);
};

export default Rightbar;
