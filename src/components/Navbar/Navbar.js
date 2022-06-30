// React
import { React, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Dropdown from "components/Navbar/Dropdown";

// Styles
import "styles/Navbar/Navbar.css";

const Navbar = () => {

    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => {
        setClick(!click);
    };

    const closeMobileMenu = () => {
        setClick(false);
    };

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    return (

        <nav className="navbar">

            {/* Logo */}
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                Assicurazioni
            </Link>

            {/* Icona Menu Hamburger */}
            <div className="menu-icon" onClick={handleClick}>
                <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>


            {/* Menu Hamburger */}
            <ul className={click ? "nav-menu active" : "nav-menu"}>

                {/* Section */}
                <li className="nav-item">
                    {/* <Link to="/clienti" className="nav-links" onClick={closeMobileMenu}> */}
                    <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                        Clienti
                    </Link>
                </li>

                {/* Cascade Section  */}
                {/* <li className="nav-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <Link to="/elementoPredefinitoSezioneCascata" className="nav-links" onClick={closeMobileMenu}>
                        Sezione a Cascata <i className="fas fa-caret-down" />
                    </Link>
                    {dropdown && <Dropdown />}
                </li> */}

                {/* Section */}
                {/* <li className="nav-item">
                    <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                        SezioneVuota
                    </Link>
                </li> */}

                {/* Last Section (only menu hamburger) */}
                {/* <li>
                    <a className="nav-links-mobile" target="_blank" rel="noreferrer" href="blank">
                        UltimaSezioneMenuHamburger
                    </a>
                </li> */}
                
            </ul>

            {/* Last Section */}
            <a target="_blank" rel="noreferrer" href="https://sorvassicurazioni.wixsite.com/website">
                <button className="btn">
                    Contatti
                </button>
            </a>
            

        </nav>

    );

};

export default Navbar;
