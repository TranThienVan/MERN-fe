import React, { useEffect, useState } from 'react';
import './post.css';
import { MoreVert } from '@material-ui/icons';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../redux/actions/auth.actions';
import api from '../../apiService';
import { Send } from '@material-ui/icons';

const Post = ({ post, username, userId }) => {
	// Like function
	const dispatch = useDispatch()
	const [ like, setLike ] = useState(post.likes.length);
	const [openComments, setOpenComments] = useState(false)
	const [content, setContent] = useState("")

	const loginUser = useSelector(state=> state.auth.user)
	const [ user, setUser ] = useState({});

	// Folder URL (assets)
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const currentUser = useSelector(state => state.auth.user)

	useEffect(
		() => {
			const fetchUser = async () => {
				const res = await api.get(`/users?userId=${post.userId}`);
				setUser(res.data);
			};
			fetchUser();
		},
		[post?.userId, userId]
	);

	const likeHandler = () => {
		const fetchLike = async()=>{
			try {
				const res = await api.put('/posts/' + post._id + '/like', { userId: currentUser._id });
				setLike(res.data.post.likes.length)
				// setLike(isLiked ? like - 1 : like + 1);
				
			} catch (err) {}
			// setIsLiked(!isLiked);
		}
		fetchLike()
	};

	const handleOpen =()=>{
		setOpenComments(!openComments)
	}
	const handleOnChange =(e)=>{
		setContent(e.target.value)
	}
	const submitComment = async(e)=>{
		e.preventDefault()
		await api.post("/comments", {
			content: content,
			postId: post._id,
		})	
		setContent("")
		dispatch(authAction.getPost({user: loginUser, username }))
	}
	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link to={`profile/${user?.username}`}>
							<img
								className="postProfileImg"
								src={user?.profilePicture ? user?.profilePicture : PF + 'person/noAvatar.png'}
								alt=""
							/>
						</Link>
						<span className="postUsername">{user?.username}</span>
						<span className="postDate">{format(post.createdAt)}</span>
					</div>
					<div className="postTopRight">
						<MoreVert />
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{post.desc}</span>
					<img className="postImg" src={PF + post.img} alt="" />
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
						<span className="postLikeCounter">{like} people loved it</span>
					</div>
					<div className="postBottomRight" onClick={handleOpen}>
						<span className="postCommentText">{post.comment} comments</span>
						
					</div>
				</div>
				
				<div className={openComments? "comment-active comments":"comment"}>
					<div>
						<form onSubmit={submitComment} className="CommentForm" >
							<input className="commentInput" placeholder="Comment..." onChange={handleOnChange} value={content}/>
							<button className="commentButton" type="submit">Comment</button>
							
						</form>
					</div>
					{post.comments?.map((comment)=>(
					<div className="commentSection">
						<div className="commentName">
							<div >
								<img className="commentPicture" src={comment.userId?.profilePicture ? comment.userId?.profilePicture : PF + "person/noAvatar.png"} alt="" /> 
							</div>
							<div style={{marginLeft:"10px", marginTop:'2px'}}>
								{comment.userId?.username}
							</div>
						</div>
						<div className="commentContent">{comment.content}</div>
						 
					</div>))}
				</div>
			</div>
		</div>
	);
};

export default Post;
