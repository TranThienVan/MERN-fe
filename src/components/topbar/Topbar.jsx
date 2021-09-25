import React, { useContext } from 'react';
import './topbar.css';
import { Search, Person, Home, Telegram, Notifications, ExitToApp} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Topbar = () => {
	const { user } = useContext(AuthContext);

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
					<input placeholder="Search" className="searchInput" />
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
							e.preventDefault();
							localStorage.clear();
							window.location.reload();
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
						src={user?.profilePicture ? PF + user?.profilePicture : PF + 'person/noAvatar.png'}
						alt=""
						className="topbarImg"
					/>
				</Link>
			</div>
		</div>
	);
};

export default Topbar;
