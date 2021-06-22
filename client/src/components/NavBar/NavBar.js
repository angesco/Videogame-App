import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.css';

export default function NavBar() {
    return (
        <header className="navbar">
            <div>
                <img />
            </div>
            <nav>
                <ul className="list">
                    <li className="list-item">
                        {/* <NavLink exact to="/home" >Home</NavLink> */}
                        <NavLink exact to="/home"><span class="material-icons icons">home</span></NavLink>
                        <NavLink to="/home/favs"><span class="material-icons icons">favorite</span></NavLink>
                        <NavLink to="/home/create"><span class="material-icons icons">add</span></NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}