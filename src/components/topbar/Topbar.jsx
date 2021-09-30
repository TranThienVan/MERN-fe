import React, { useContext, useEffect, useState } from 'react';
import './topbar.css';
import { Search, Person, Home, Telegram, Notifications, ExitToApp} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../redux/actions/auth.actions';
import api from '../../apiService';
import { useHistory } from 'react-router';

const Topbar = () => {
	const [search, setSearch] = useState("")
	const [data, setData] = useState([])
	const history = useHistory()

	// const { user } = useContext(AuthContext);
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(authAction.getMe())
	}, [])

	const user = useSelector(state => state.auth.user)

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	// handleOnFetch
	const handleOnFetch = (e) => {
		console.log(e.target.value)
		setSearch(e.target.value)
	}

	// useEffect for fetching data
	useEffect(() => {
		const fetchSearch = async () =>{
			const res = await api.get(`/users/find/${search}`)
			setData(res?.data)
		}
		fetchSearch()
	}, [search])

	return (
		<div className="topbarContainer">
			{/* TopbarLeft */}
			<div className="topbarLeft">
				<Link to="/" style={{ color: 'black', textDecoration: ' none' }}>
					<span className="logo">Homebook</span>
				</Link>
			</div>

			{/* TopbarCenter */}
			<div className="topbarCenter">
				{/* Searchbar */}
				<div className="searchbar">
					<Search className="searchIcon" />
					<input placeholder="Search" className="searchInput" onChange={handleOnFetch}/>
				</div>
				<div className="hiddenSearchbar">
						{data?.map((user) => (
							<Link to={`/profile/${user?.username}`} className="searchbarResults">
								<img src={user?.profilePicture} alt="user Profile picture" height="20px"/>
								<span>{user?.username}</span>
							</Link>
						))}
				</div>
			</div>

			{/* TopbarRight */}
			<div className="topbarRight">
				<div className="topbarLinks">
					<Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
						<Home className="topbarLink1" />
					</Link>

					<Link
						to="/login"
						style={{ textDecoration: 'none', color: 'black' }}
						onClick={(e) => {
							history.push('/')
							dispatch(authAction.logout())
						}}
					>
						<ExitToApp className="topbarLink" />
					</Link>
				</div>
				<div className="topbarIcons">
					<div className="topbarIconItem">
						<Person className="topbarleftIcons" />
						<span className="topbarIconBadge">3</span>
					</div>
					<div className="topbarIconItem">
						<Link to="/messenger" style={{ textDecoration: 'none', color: 'black' }}>
							<Telegram className="topbarleftIcons" />
							<span className="topbarIconBadge">2</span>
						</Link>
					</div>
					<div className="topbarIconItem">
						<Notifications className="topbarleftIcons" />
						<span className="topbarIconBadge">3</span>
					</div>
				</div>
				<Link to={`/profile/${user?.username}`}>
					<img
						src={user?.profilePicture ? user?.profilePicture : PF + 'person/noAvatar.png'}
						alt=""
						className="topbarImg"
					/>
				</Link>
			</div>
		</div>
	);
};

export default Topbar;
