import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import Home from './Home';
import Artist from './Artist';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  const [calendar, updateCalendar] = useState([])
  function pullCalendar() {
    const sheetURL = "/calendar.json"
    fetch(sheetURL)
      .then(res => res.text())
      .then(body => {
         const data = JSON.parse(body)
          updateCalendar(data.data)
      });
  }
  useEffect(() => {
    pullCalendar()
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
          <Home calendar={calendar}></Home>
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
