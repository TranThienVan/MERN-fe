import React, { useRef } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAction } from '../../redux/actions/auth.actions';

const Login = () => {
	// Quickly form require
	const email = useRef();
	const password = useRef();
	// const { user, isFetching, dispatch } = useContext(AuthContext);

	const dispatch = useDispatch();

	const handleClick = (e) => {
		e.preventDefault();
		dispatch(authAction.login({ email: email.current.value, password: password.current.value }));
	};

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Homebook</h3>
					<span className="loginDesc">Connect with friends and the world around you!</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={handleClick}>
						<input placeholder="Email" type="email" required className="loginInput" ref={email} />
						<input
							placeholder="Password"
							type="password"
							required
							minLength="6"
							className="loginInput"
							ref={password}
						/>
						<button className="loginButton" type="submit">
							Login
							{/* disabled={isFetching} */}
							{/* {isFetching ? <CircularProgress color="white" size="20px" /> : 'Log In'} */}
						</button>
						<span className="loginForgot">Forgot Password?</span>
						<Link to="/register">
							<button className="loginRegisterButton">
								Register
								{/* {isFetching ? <CircularProgress color="white" size="20px" /> : 'Create a New Account'} */}
							</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
