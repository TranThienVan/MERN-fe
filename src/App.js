import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import { useSelector } from 'react-redux';

// React Router Dom
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Messenger from './pages/messenger/Messenger';

function App() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					{isAuthenticated ? <Home /> : <Register />}
				</Route>
				<Route path="/login">{isAuthenticated ? <Redirect to="/" /> : <Login />}</Route>
				<Route path="/register">{isAuthenticated ? <Redirect to="/login" /> : <Register />}</Route>
				<Route path="/messenger">{!isAuthenticated ? <Redirect to="/" /> : <Messenger />}</Route>
				<Route path="/profile/:username">
					<Profile />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
