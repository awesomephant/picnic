import React, { useState } from 'react';
import Calendar from './Calendar.js';
import Window from './Window.js'
import CurrentDate from './CurrentDate.js'
import {
    Link
} from "react-router-dom";
import { data } from "./calendarData.json";

function renderObjects(arr) {
    const objects = arr.map((obj, i) => {
        const objectStyle = {
            gridColumn: `${obj.x} / ${obj.x + obj.w}`,
            gridRow: `${obj.y} / ${obj.y + obj.h}`
        }
        let content = null;
        if (obj.type === 'img') {
            objectStyle.backgroundImage = `url(${obj.properties.src})`
        }
        if (obj.type === 'text') {
            content = obj.properties.text
        }
        if (obj.type === 'embed') {
            content = <iframe title={`embed-${i}`} width="560" height="315" src="https://www.youtube.com/embed/IyNrcayUNfg?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        }
        return (
            <div style={objectStyle} key={`obj-${i}`} className={`object ${obj.type}`}>
                {content}
            </div>
        )
    })

    return objects;
}

export default function Artist(props) {
    const objects = JSON.parse(data[0].code);
    const items = renderObjects(objects)

    const [calendarActive, setCalendarActive] = useState(false);

    function toggleCalendar() {
        if (calendarActive === true) {
            setCalendarActive(false)
        } else {
            setCalendarActive(true)
        }
    }

    return (
        <main className='artist'>
            <nav className="artist-meta">
                <Link className='artist' to='/'>Picnic</Link>
                <Link className='readymeals highlight' to='https://www.paypal.me/picniccollective'>Support</Link>
                <a className='date' href='#1' onClick={toggleCalendar}><CurrentDate></CurrentDate></a>
                <a className='collective' href='#1'>{data[0].artist_name}</a>
            </nav>
            <div className='artist-grid'>
                {items}
            </div>
            {calendarActive === true &&
                <Window title='Calendar' x={200} y={400} className='window' draggable={false}>
                    <Calendar></Calendar>
                </Window>
            }
        </main>
    )
}