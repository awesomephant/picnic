import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import Home from './Home';
import Artist from './Artist';
import parse from 'csv-parse';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  const [calendar, updateCalendar] = useState([])
  function pullCalendar() {
    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1jPOtPG21i16eRGOMBtDYJgFq1WlweNExCQ34Ui1bUtZ1aFad_yjA41sjc5-vjONVblFuJFWusWmW/pub?gid=0&single=true&output=csv"
    fetch(sheetURL)
      .then(res => res.text())
      .then(body => {
        parse(body, { columns: true }, function (err, data) {
          console.log(`${data.length} calendar entries found.`)
          updateCalendar(data)
        })
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
