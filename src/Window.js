import React, { useState, useRef } from 'react'
import "./css/Window.scss"

export default function Window(props) {
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: props.x || 0, y: props.y || 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const windowEl = useRef(null)

    function handleDragStart(e) {
        setDragging(true)
        const box = windowEl.current.getBoundingClientRect()
        setOffset({ x: props.mouse.x - box.x, y: props.mouse.y - box.y })
    }

    function handleDragEnd() {
        setDragging(false)
        setPosition({ x: props.mouse.x, y: props.mouse.y })
    }

    let windowStyle;
    if (dragging) {
        windowStyle = {
            transform: `translateX(${props.mouse.x - offset.x}px) translateY(${props.mouse.y - offset.y}px)`
        }
    } else {
        windowStyle = {
            transform: `translateX(${position.x - offset.x}px) translateY(${position.y - offset.y}px)`
        }
    }

    return (
        <div ref={windowEl} data-dragging={dragging} className='window' style={windowStyle}>
            <header onMouseDown={handleDragStart} onMouseUp={handleDragEnd} className='window-header'>
                <h3 className="window-title">{props.title}</h3>
            </header>
            <div className='window-body'>
                {props.children}
            </div>
        </div>
    )
}