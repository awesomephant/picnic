import React from 'react';
import CurrentDate from './CurrentDate.js'
import {
    Link
} from "react-router-dom";

const data = '[{"type":"img","properties":{"src":"https://picsum.photos/500"},"x":7,"y":7,"w":15,"h":14},{"type":"img","properties":{"src":"https://picsum.photos/500"},"x":7,"y":7,"w":15,"h":14},{"type":"img","properties":{"src":"https://picsum.photos/500"},"x":7,"y":7,"w":15,"h":14},{"type":"img","properties":{"src":"https://picsum.photos/500"},"x":26,"y":10,"w":14,"h":10},{"type":"img","properties":{"src":"https://picsum.photos/500"},"x":26,"y":10,"w":14,"h":10},{"type":"img","properties":{"src":"https://picsum.photos/500"},"x":26,"y":10,"w":14,"h":10},{"type":"img","properties":{"src":"https://picsum.photos/500"},"x":15,"y":26,"w":12,"h":7},{"type":"img","properties":{"src":"https://picsum.photos/500"},"x":15,"y":26,"w":12,"h":7},{"type":"img","properties":{"src":"https://picsum.photos/500"},"x":15,"y":26,"w":12,"h":7}]'

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
    const objects = JSON.parse(data);
    const items = renderObjects(objects)

    return (
        <main className='artist'>
            <nav className="artist-meta">
                <Link to='/'>Picnic</Link>
                <Link to='#1' className='highlight'>Support</Link>
                <a href='#1'><CurrentDate></CurrentDate></a>
                <a href='#1'>Max Kohler</a>
            </nav>
            <div className='artist-grid'>
                {items}
            </div>
        </main>
    )
}