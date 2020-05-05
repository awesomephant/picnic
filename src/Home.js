import React from 'react';
import Cloth from './Cloth';
import logo from './logo.svg';
import {
    Link
} from "react-router-dom";

export default function Home() {
    return (
        <main>
            <nav className='site-nav'>
                <Link to="/artist/">R1</Link>
                <Link to="/editor/">Ready Meals</Link>
                <a href="#1">Date</a>
                <a href="#1">Collective</a>
            </nav>
            <h1 className='site-title'>
                PICNIC
        <img src={logo} alt='logo'></img>
            </h1>
            <Cloth></Cloth>
        </main>
    )
}