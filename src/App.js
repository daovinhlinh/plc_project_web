import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { PrivateRoute } from "./commons/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route element={<PrivateRoute />}>
          <Route path="*" element={<Homepage />} />
        </Route> */}
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/home" element={<Homepage />} />
      </Routes>
      {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header> */}
    </div>
  );
}

export default App;
