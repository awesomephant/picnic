import React from 'react';
import Editor from './Editor';
import Cloth from './Cloth';
import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/artist'>
          <Link to='/'>Home</Link>
        </Route>

        <Route path='/picnic/editor'>
            <Editor></Editor>
        </Route>
        <Route path='/'>
          <nav className='site-nav'>
            <a href="#1">R1</a>
            <a href="#1">Ready Meals</a>
            <a href="#1">Date</a>
            <a href="#1">Collective</a>
          </nav>
          <h1 className='site-title'>
            PICNIC
            <img src={logo} alt='logo'></img>
          </h1>
          <Cloth></Cloth>
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
