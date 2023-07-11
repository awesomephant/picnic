import React, { useEffect, useState } from "react"
import Editor from "./Editor"
import Home from "./Home"
import Artist from "./Artist"
import residencies from "./data/residencies.json"
import currentSettings from "./data/settings.json"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

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
      <Routes>
        <Route path="/residency/:id" element={<Artist calendar={calendar} />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/" element={<Home calendar={calendar} settings={settings} />} />
      </Routes>
    </Router>
  )
}

export default App
