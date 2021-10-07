import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './register.css';
import { useDispatch } from 'react-redux';
import { authAction } from '../../redux/actions/auth.actions';

const Register = () => {
	// Quickly form require
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordAgain = useRef();

	const dispatch = useDispatch();

	const handleClick = async (e) => {
		e.preventDefault();
		if (passwordAgain.current.value !== password.current.value) {
			passwordAgain.current.setCustomValidity("Passwords don't match!");
		} else {
			const user = {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value
			};
			// try {
			// 	await axios.post('/auth/register', user);
			// 	history.push('/login');
			// } catch (err) {
			// 	console.log(err);
			// }
			dispatch(authAction.register(user));
		}
	};

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Homebook</h3>
					<span className="loginDesc">Connect with friends and the world around you! </span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={handleClick}>
						<input placeholder="Username" required ref={username} className="loginInput" />
						<input placeholder="Email" required ref={email} type="email" className="loginInput" />
						<input
							placeholder="Password"
							required
							ref={password}
							type="password"
							minLength="6"
							className="loginInput"
						/>
						<input
							placeholder="Re-enter Password"
							required
							ref={passwordAgain}
							type="password"
							className="loginInput"
						/>
						<button className="loginButton" type="submit">
							Sign up
						</button>
						<Link to="/login" style={{ width: '100%' }}>
							<button className="loginRegisterButton">Login in Account</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
