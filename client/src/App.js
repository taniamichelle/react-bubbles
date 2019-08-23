import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import { PrivateRoute } from './components/PrivateRoute';
import "./styles.scss";

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
        <div className='links'>
          <Link to='/login'>Login</Link>
          <Link to='/protected'>Protected Page</Link>
        </div>
        <div className='routes'>
          <Route exact path="/" component={Login} />
          {/* 
            Build a PrivateRoute component that will 
            display BubblePage when you're authenticated 
          */}
          <PrivateRoute path='/protected' component={BubblePage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
