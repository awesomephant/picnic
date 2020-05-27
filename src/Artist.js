import React, { useState } from 'react';
import Calendar from './Calendar.js';
import Window from './Window.js'
import CurrentDate from './CurrentDate.js'
import {
    Link,
    useParams
} from "react-router-dom";

function renderObjects(tree) {
    let objects = []
    for (const key in tree) {
        const obj = tree[key];
        let content = null;
        const objectStyle = {
            gridColumn: `${obj.x} / ${obj.x + obj.w}`,
            gridRow: `${obj.y} / ${obj.y + obj.h}`
        }
        if (obj.type === 'img') {
            objectStyle.backgroundImage = `url(${obj.src})`
        }
        if (obj.type === 'rect') {
            objectStyle.backgroundColor = `${obj.background}`
        }
        if (obj.type === 'text') {
            content = obj.text;
            objectStyle.color = obj.color;
            objectStyle.fontFamily = obj.fontFamily + ', sans-serif';
            if (obj.fontFamily.includes('oblique')) {
                objectStyle.fontStyle = 'italic';
            }
            objectStyle.fontSize = obj.fontSize;
            objectStyle.letterSpacing = obj.letterSpacing;
            objectStyle.lineHeight = obj.lineHeight;
            objectStyle.fontWeight = obj.fontWeight;
        }
        if (obj.type === 'embed') {
            content = <iframe title={`embed-${key}`} width="560" height="315" src={obj.url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        }

        const element = <div style={objectStyle} key={`obj-${key}`} className={`object ${obj.type}`}>
            {content}
        </div>
        objects.push(element)
    }
    return objects;
}

function getRowById(data, id) {
    console.log(`Searching ${data.length}`)
    data.forEach(row => {
        if (row.id.toString() === id.toString()) {
            console.log('found')
            console.log(row)
            return row
        }
    })
    return false;
}

export default function Artist(props) {
    let { id } = useParams();
    const residency = props.calendar[parseInt(id)];
    const [calendarActive, setCalendarActive] = useState(false);

    function toggleCalendar() {
        if (calendarActive === true) {
            setCalendarActive(false)
        } else {
            setCalendarActive(true)
        }
    }

    let content = '';
    if (residency) {
        let items = []
        try {
            items = renderObjects(JSON.parse(residency.code))
        } catch (error) {

        }
        content =
            <>
                <nav className="artist-meta">
                    <Link className='artist' to='/'>Picnic</Link>
                    <a className='readymeals highlight' href={residency.artist_support_link}>Support</a>
                    <a className='date' href='#1' onClick={toggleCalendar}><CurrentDate></CurrentDate></a>
                    <a className='collective' href={residency.artist_website}>{residency.artist_name}</a>
                </nav>
                <div className='artist-grid'>
                    {items}
                </div>
            </>
    }

    return (
        <main className='artist'>
            {content}
            {calendarActive === true &&
                <Window title='Calendar' x={200} y={400} className='window' draggable={false}>
                    <Calendar calendar={props.calendar}></Calendar>
                </Window>
            }
        </main>
    )
}