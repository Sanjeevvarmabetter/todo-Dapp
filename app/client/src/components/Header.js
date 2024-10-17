import React, { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const icon = menuOpen ? <FaTimes /> : <FaBars />;

    return (
        <header className="header">
            <h1 className="title">ToDo Dapp</h1>
            <nav className={`nav ${menuOpen ? "active" : ""}`}>
                {/* <div className="wallet">
                <ConnectWallet />   
                </div> */}
                <a href="/" className="navLink"></a>
                <a href="/" className="navLink"></a>
                <a href="/" className="navLink"></a>
                
            </nav>
            <div 
                className='hamburger' 
                onClick={toggleMenu} 
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
                {icon}
            </div>
        </header>
    );
};

export default Header;
