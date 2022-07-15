// React
import { React, useState } from "react";
import { Link } from "react-router-dom";

// Components
import DropdownNuovo from "components/Navbar/DropdownNuovo";

// Styles
import "styles/Navbar/Navbar.css";

const Navbar = () => {

    const [clickMobileMenu, setClickMobileMenu] = useState(false); //DISABLE
    // const [clickMobileMenu, setClickMobileMenu] = useState(true); //ENABLE
    const [dropdown, setDropdown] = useState(false);

    
    // on focus mouse
    const handleMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };
    
    // on leave mouse
    const handleMouseLeave = () => {
        setDropdown(false);
    };

    
    
    return (

        <nav className="navbar">
        {/* ---------------------------------------------------------------------- */}
        {/* Navbar */}
        {/* ---------------------------------------------------------------------- */}
        
            
            {/* ---------------------------------------------------------------------- */}
            {/* Navbar Logo */}
            {/* ---------------------------------------------------------------------- */}
            <Link to="/" className="navbar-logo"
            // handleClickCloseMobileMenu
            onClick={() => setClickMobileMenu(false)}>
                Assicurazioni
            </Link>
            
            
            {/* ---------------------------------------------------------------------- */}
            {/* Navbar Menu Icon */}
            {/* ---------------------------------------------------------------------- */}
            <div className="menu-icon"
            // handleClickToggleMobileMenu
            onClick={() => setClickMobileMenu(!clickMobileMenu)}>
                <i className={clickMobileMenu ? "fas fa-times" : "fas fa-bars"} />
            </div>
            
            
            {/* ---------------------------------------------------------------------- */}
            {/* Navbar Menu */}
            {/* ---------------------------------------------------------------------- */}
            <ul className={clickMobileMenu ? "nav-menu active" : "nav-menu"}>
                
                
                {/* ---------------------------------------------------------------------- */}
                {/* Navbar Menu Section */}
                {/* ---------------------------------------------------------------------- */}
                <li className="nav-item">
                    <Link to="/clienti" className="nav-links"
                    // handleClickCloseMobileMenu
                    onClick={() => setClickMobileMenu(false)}>
                        Clienti
                    </Link>
                </li>
                
                
                {/* ---------------------------------------------------------------------- */}
                {/* Navbar Menu Section */}
                {/* ---------------------------------------------------------------------- */}
                <li className="nav-item">
                    <Link to="/polizze" className="nav-links"
                    // handleClickCloseMobileMenu
                    onClick={() => setClickMobileMenu(false)}>
                        Polizze
                    </Link>
                </li>
                
                
                {/* ---------------------------------------------------------------------- */}
                {/* Navbar Menu Section */}
                {/* ---------------------------------------------------------------------- */}
                <li className="nav-item">
                    <Link to="/veicoli" className="nav-links"
                    // handleClickCloseMobileMenu
                    onClick={() => setClickMobileMenu(false)}>
                        Veicoli
                    </Link>
                </li>
                
                
                {/* ---------------------------------------------------------------------- */}
                {/* Navbar Menu Section Cascade (DROPDOWN) */}
                {/* ---------------------------------------------------------------------- */}
                <li className="nav-item"
                // handleMouseEnter (FOR DESKTOP)
                onMouseEnter={handleMouseEnter}
                // handleMouseLeave (FOR DESKTOP)
                onMouseLeave={handleMouseLeave}>
                    <Link to="/nuovo" className="nav-links"
                    // handleClickCloseMobileMenu
                    onClick={() => setClickMobileMenu(false)}>
                        Nuovo ▼
                        {/* ??? */} <i className="fas fa-caret-down" />
                    </Link>
                    {dropdown && <DropdownNuovo />}
                </li>
                
                {/* ---------------------------------------------------------------------- */}
                {/* Navbar Menu Section */}
                {/* ---------------------------------------------------------------------- */}
                <li className="nav-item">
                    <Link to="/ricerca" className="nav-links"
                    // handleClickCloseMobileMenu
                    onClick={() => setClickMobileMenu(false)}>
                        Ricerca 🔍
                    </Link>
                </li>
                
                
                
                
                
                {/* ---------------------------------------------------------------------- */}
                {/* Navbar Menu Section Violet (discord - ONLY MOBILE) */}
                {/* ---------------------------------------------------------------------- */}
                <li>
                    <a className="nav-links-mobile" target="_blank" rel="noreferrer" href="blank">
                        Violet Button MOBILE
                    </a>
                </li>
                
                
                
            {/* --------------------- END Navbar Menu --------------------- */}
            </ul>


            {/* ---------------------------------------------------------------------- */}
            {/* Navbar Menu Section Violet (discord - ONLY DESKTOP) */}
            {/* ---------------------------------------------------------------------- */}
            {/* <a target="_blank" rel="noreferrer" href="blank">
                <button className="btn">
                    Violet Button DESKTOP
                </button>
            </a> */}
            

        {/* --------------------- END Navbar --------------------- */}
        </nav>

    );

};

export default Navbar;
