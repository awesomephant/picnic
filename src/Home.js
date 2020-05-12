import React, { useState } from 'react';
import Cloth from './Cloth';
import Window from './Window.js';
import logo from './logo.svg';
import CurrentDate from './CurrentDate.js';
import Calendar from './Calendar.js';
import {
    Link
} from "react-router-dom";

export default function Home(props) {
    const [calendarActive, setCalendarActive] = useState(false);
    function toggleCalendar(){
        if (calendarActive === true){
            setCalendarActive(false)
        } else {
            setCalendarActive(true)
        }
    }
    return (
        <main>
            <nav className='site-nav'>
                <Link className='highlight' to="/artist/">R1</Link>
                <Link to="/editor/">Ready Meals</Link>
                <a href="#1" onClick={toggleCalendar}><CurrentDate></CurrentDate></a>
                <a href="#1">Collective</a>
            </nav>
            <h1 className='site-title'>
                PICNIC
        <img src={logo} alt='logo'></img>
            </h1>
            <Cloth></Cloth>
            {calendarActive === true &&
                <Window title='Calendar' x={200} y={400} className='window' draggable={false}>
                    <Calendar></Calendar>
                </Window>
            }
        </main>
    )
}