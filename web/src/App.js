import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import Home from './Home';
import Artist from './Artist';
import residencies from './data/residencies.json';
import currentSettings from './data/settings.json';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  const [calendar, updateCalendar] = useState([])
  const [settings, updateSettings] = useState({ currentResidency: null })

  function hydrate() {
    updateCalendar(residencies)
    updateSettings(currentSettings)
  }
  useEffect(() => {
    hydrate()
  }, [])

  return (
    <Router>
      <Switch>

        <Route path='/residency/:id'>
          {<Artist calendar={calendar} />}
        </Route>

        <Route path='/editor'>
          <Editor></Editor>
        </Route>

        <Route path='/'>
          <Home calendar={calendar} settings={settings}></Home>
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
