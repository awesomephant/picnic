import React, { useState, useEffect, useRef } from "react";
import banana from "./assets/banana.png"
import "./css/IdleOverlay.scss"

export default function IdleOverlay(props) {

    useEffect(() => {
        function addImage() {
            const image = { x: gra(0, 100), y: gra(0, 100), r: gra(0, 360) }
            setImages(images => [...images, image])
        }
        overlayTimer.current = setInterval(addImage, 5000)
        return (() => {
            clearInterval(overlayTimer.current)
        })
    }, [props.active])

    const [images, setImages] = useState([])
    const overlayTimer = useRef(null);
    function gra(min, max) {
        return Math.random() * (max - min) + min;
    }


    const imageEls = images.map((img, i) => {
        return (<img alt='' style={{ left: `${img.x}%`, top: `${img.y}%`, transform: `rotate(${img.r}deg)` }} key={`overlay-${i}`} src={banana}></img>)
    })


    return (
        <div className={`idleOverlay`}>
            {imageEls}
        </div>
    )
}