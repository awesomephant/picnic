import React, { useState } from 'react';
import Cloth from './Cloth';
import Window from './Window.js';
import logo from './logo.svg';
import CurrentDate from './CurrentDate.js';
import {
    Link
} from "react-router-dom";

export default function Home(props) {
    const [calendarActive, setCalendarActive] = useState(false);
    return (
        <main>
            <nav className='site-nav'>
                <Link className='highlight' to="/artist/">R1</Link>
                <Link to="/editor/">Ready Meals</Link>
                <a href="#1"><CurrentDate></CurrentDate></a>
                <a href="#1">Collective</a>
            </nav>
            <h1 className='site-title'>
                PICNIC
        <img src={logo} alt='logo'></img>
            </h1>
            <Cloth></Cloth>
            <Window title='Calendar' mouse={props.mouse} className='window'>
                this is a calendar
        </Window>
        </main>
    )
}