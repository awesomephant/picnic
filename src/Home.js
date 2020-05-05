import React from 'react';
import Cloth from './Cloth';
import logo from './logo.svg';

export default function Home() {
    return (
        <main>
            <nav className='site-nav'>
                <a href="#1">R1</a>
                <a href="#1">Ready Meals</a>
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