import './App.css';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Forum from './components/Forum';
import Home from './components/Home';
import Login from './components/Login';
import Ranked from './components/Ranked';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<Home />}>
              </Route>
              <Route exact path="/login" element={<Login />}>
              </Route>
              <Route exact path="/forum" element={<Forum />}>
              </Route>
              <Route exact path="/ranked" element={<Ranked />}>
              </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
