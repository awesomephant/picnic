import React from "react";
import "./css/Chyron.scss"

export default function Chyron(props){
    return(<section className='chyron'><span>{props.text}</span></section>)
}