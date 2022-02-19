import React from 'react'

import '../styles/theme.css';

import { Link } from "react-router-dom";

function Header() {
  return (
        <header>
            <div id="headerContent">
                <div className="banner">
                    <Link to='/'>
                        <img className="logo" alt="Dino Travel Logo" />
                    </Link>
                    <div className="slogan">
                        <h3>Travel More</h3>
                    </div>
                </div>

                <nav>
                    <Link to='/support' >
                        <button className="nontoggle">support</button>
                    </Link>
                    <Link to='/about'>
                        <button className="nontoggle">about us</button>
                    </Link>
                    <Link to='/trips'>
                        <button className="nontoggle">trips</button>
                    </Link>
                    <Link to='/login'>
                        <button className="nontoggle">login</button>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header