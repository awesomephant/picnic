import React from 'react';
import ModeSwitch from './ModeSwitch';
import Editor from './Editor';
import Cloth from './Cloth';

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

        <Route path='/editor'>
          <div className="app">
            <header className="app-header"><h1>Editor</h1></header>
            <ModeSwitch></ModeSwitch>
            <Editor></Editor>
          </div>
        </Route>
        <Route path='/'>
          <nav>
            <Link to='/artist'>Artist</Link>
            <Link to='/editor'>Editor</Link>
          </nav>
          <Cloth>
          </Cloth>
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
