import React from "react"
import "./css/Chyron.css"

export default function Chyron(props) {
  return (
    <section className={`chyron chyron-${props.position} animate-${props.animate}`} data-active={props.active} data-direction={props.direction}>
      <span>{props.children}</span>
    </section>
  )
}

Chyron.defaultProps = {
  animate: true,
  position: "bottom",
  direction: "ltr",
}
