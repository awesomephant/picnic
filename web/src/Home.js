import React, { useState, useEffect } from "react"
import Cloth from "./Cloth"
import Window from "./Window.js"
import logo from "./logo.svg"
import CurrentDate from "./CurrentDate.js"
import Calendar from "./Calendar.js"
import Chyron from "./Chyron.js"
import IdleOverlay from "./IdleOverlay.js"
import { Link } from "react-router-dom"

export default function Home(props) {
  const [calendarActive, setCalendarActive] = useState(true)
  const [bottomChyronActive, setBottomChyronActive] = useState(false)
  const [topChyronActive, setTopChyronActive] = useState(false)
  const [idleTime, setIdleTime] = useState(0)
  function incrementIdleTime() {
    setIdleTime((idleTime) => idleTime + 1)
  }

  useEffect(() => {
    window.setInterval(incrementIdleTime, 1000)
  }, [])

  function toggleCalendar() {
    setIdleTime(0)
    if (calendarActive === true) {
      setCalendarActive(false)
    } else {
      setCalendarActive(true)
    }
  }

  function toggleBottomChyron() {
    setIdleTime(0)
    if (bottomChyronActive === true) {
      setBottomChyronActive(false)
    } else {
      setBottomChyronActive(true)
    }
  }
  function toggleTopChyron() {
    setIdleTime(0)
    if (topChyronActive === true) {
      setTopChyronActive(false)
    } else {
      setTopChyronActive(true)
    }
  }

  return (
    <main onClick={() => setIdleTime(0)}>
      <nav className="site-nav" data-bottomchyron={bottomChyronActive} data-topchyron={topChyronActive}>
        {props.settings.currentResidency !== null && (
          <Link className="artist highlight" to={`/residency/${props.settings.currentResidency.slug}`}>
            R1
          </Link>
        )}
        <a className="readymeals" href="#1" onClick={toggleTopChyron}>
          Ready Meals
        </a>
        <a className="date" href="#1" onClick={toggleCalendar}>
          <CurrentDate></CurrentDate>
        </a>
        <a className="collective" href="#1" onClick={toggleBottomChyron}>
          Collective
        </a>
      </nav>
      <h1 className="site-title">
        PICNIC
        <img src={logo} alt="logo"></img>
      </h1>
      <Cloth></Cloth>
      {calendarActive === true && (
        <Window width="20rem" title="Calendar" x={200} y={250} className="window" draggable={false}>
          <Calendar calendar={props.calendar}></Calendar>
        </Window>
      )}
      <Chyron position="top" direction="ltr" active={topChyronActive}>
        <div className="chyron-item">
          <i>☻</i>
          <a href="https://www.paypal.me/picniccollective">Support</a>
          <i>☻</i>
          <a href="https://everpress.com/picniccollective">Shop</a>
          <i>☻</i>
          <a href="mailto:itspicniccollective@gmail.com?subject=Submission&body=Name%3A%0D%0AWebsite%3A%0D%0A">Submit</a>
          <i>☻</i>
          <a href="https://www.paypal.me/picniccollective">Support</a>
          <i>☻</i>
          <a href="https://everpress.com/picniccollective">Shop</a>
          <i>☻</i>
          <a href="mailto:itspicniccollective@gmail.com?subject=Submission&body=Name%3A%0D%0AWebsite%3A%0D%0A">Submit</a>
          <i>☻</i>
        </div>
      </Chyron>
      <Chyron position="bottom" direction="rtl" active={bottomChyronActive}>
        Picnic is an independent residency programme supporting creatives of all nature. Each resident gets 24 hours to interact with the space through experimentation and self-discovery. We trust these investigations as catalysts for a communal,
        ever-changing, united network that embraces creative awakening worldwide.
      </Chyron>
      {idleTime > 30 && <IdleOverlay></IdleOverlay>}
    </main>
  )
}
