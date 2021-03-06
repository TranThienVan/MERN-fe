import React, { useRef, useState } from 'react';
import './share.css';
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import api from '../../apiService';

const Share = () => {
	// const { user } = useContext(AuthContext);
	const user = useSelector((state) => state.auth.user);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const desc = useRef();
	const [ file, setFile ] = useState(null);

	const submitHandler = async (e) => {
		console.log("Share")
		e.preventDefault();
		const newPost = {
			userId: user._id,
			desc: desc.current.value
		};
		if (file) {
			const data = new FormData();
			const fileName = Date.now() + file.name;
			data.append('name', fileName);
			data.append('file', file);
			newPost.img = fileName;
			try {
				await api.post('/upload', data);
			} catch (err) {}
		}
		try {
			console.log("something hrere")
			await api.post('/posts', newPost);
			window.location.reload();
		} catch (err) {
			console.log(err)
		}
	};
	return (
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					<img
						className="shareProfileImg"
						src={user?.profilePicture ? user.profilePicture : PF + 'person/noAvatar.png'}
						alt=""
					/>
					<input
						placeholder={"What's in your mind, " + user?.username + '?'}
						type="text"
						className="shareInput"
						ref={desc}
					/>
				</div>
				<hr className="shareHr" />
				{file && (
					<div className="shareImgContainer">
						<img src={URL.createObjectURL(file)} alt="" className="shareImg" />
						<Cancel className="shareCancelImg" onClick={() => setFile(null)} />
					</div>
				)}
				<form className="shareBottom" onSubmit={submitHandler}>
					<div className="shareOptions">
						<label htmlFor="file" className="shareOption">
							<PermMedia htmlColor="gray" className="shareIcon" />
							<span className="shareOptionText">Photo or Video</span>
							<input
								style={{ display: 'none' }}
								type="file"
								id="file"
								accept=".png,.jpeg,.jpg"
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</label>
						<div className="shareOption">
							<Label htmlColor="gray" className="shareIcon" />
							<span className="shareOptionText">Tag</span>
						</div>
						<div className="shareOption">
							<Room htmlColor="gray" className="shareIcon" />
							<span className="shareOptionText">Location</span>
						</div>
						<div className="shareOption">
							<EmojiEmotions htmlColor="gray" className="shareIcon" />
							<span className="shareOptionText">Feelings</span>
						</div>
					</div>
					<button className="shareButton" type="submit">
						Share
					</button>
				</form>
			</div>
		</div>
	);
};

export default Share;
