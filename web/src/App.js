import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import Home from './Home';
import Artist from './Artist';
import sanityClient from '@sanity/client'
import slugify from "slugify"

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  const [calendar, updateCalendar] = useState([])
  const [settings, updateSettings] = useState({ currentResidency: null })

  function hydrate() {
    const client = sanityClient({
      projectId: 'j6e3tx4f',
      dataset: 'production',
      token: '', // or leave blank to be anonymous user
      useCdn: true // `false` if you want to ensure fresh data
    })

    const query = '*[_type == "residency"]{date, artist_name, website, support_link, code}'
    client.fetch(query, {}).then(residencies => {
      console.log(`${residencies.length} residencies found.`)
      const sortedResidencies = residencies.sort((a, b) => {
        const da = new Date(a.date)
        const db = new Date(b.date)
        return db - da
      })
      sortedResidencies.forEach((r, i) => {
        sortedResidencies[i].slug = slugify(r.artist_name, { lower: true })
      })
      updateCalendar(sortedResidencies)
    })

    const settingsQuery = '*[_type == "siteSettings"]{currentResidency->{artist_name}}'
    client.fetch(settingsQuery, {}).then(settings => {
      settings[0].currentResidency.slug = slugify(settings[0].currentResidency.artist_name, { lower: true })
      updateSettings(settings[0])
    })

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
