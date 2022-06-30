// React
import { React, useState } from "react";
import { Link } from "react-router-dom";

// Styles
import "styles/Navbar/Dropdown.css";


const MenuItems = [
    {
        title: "TITOLO",
        path: "path/to/resource"
    },
    // ...
];



const Dropdown = () => {

    const [click, setClick] = useState(false);

    const handleClick = () => {
        setClick(!click);
    };

    return (
        <ul onClick={handleClick} className={click ? "dropdown-menu clicked" : "dropdown-menu"}>
            {MenuItems.map((item, index) => (
                <li key={index}>
                    <Link className="dropdown-link" to={item.path} onClick={() => setClick(false)}>
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );

};

export default Dropdown;
