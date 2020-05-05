import React from 'react';
import Editor from './Editor';
import Home from './Home';
import Artist from './Artist';


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
          <Artist></Artist>
        </Route>
        
        <Route path='/editor'>
            <Editor></Editor>
        </Route>

        <Route path='/'>
          <Home></Home>
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
