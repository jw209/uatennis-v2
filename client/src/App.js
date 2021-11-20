import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Forum from './components/Forum';
import Home from './components/Home';
import Login from './components/Login';
import Ranked from './components/Ranked';
import Register from './components/Register';
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/Dashboard";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
            <div className="App-header">
                <Router>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/forum" component={Forum} />
                    <Route exact path="/ranked" component={Ranked} />
                    <Route exact path="/register" component={Register} />
                    <Switch>
                      <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    </Switch>
                </Router>
            </div>
      </div>
    </Provider>
    
  );
}

export default App;
