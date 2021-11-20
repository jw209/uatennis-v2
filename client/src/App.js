import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Forum from './components/Forum';
import Home from './components/Home';
import Login from './components/Login';
import Ranked from './components/Ranked';
import Register from './components/Register';

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
                </Router>
            </div>
      </div>
    </Provider>
    
  );
}

export default App;
