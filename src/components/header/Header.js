import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

function Header() {
    return (
        <header className='header'>
            <div className="logo">
            <Link className='app-name' to="/">Event-O-Rama</Link>
            </div>
        </header>
    );
}

export default Header;