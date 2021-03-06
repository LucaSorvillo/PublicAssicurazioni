// React
import { React, useState } from "react";
import { Link } from "react-router-dom";

// Styles
import "styles/Navbar/Dropdown.css";

// Cascading Menu Entries 
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
        
        <ul className={click ? "dropdown-menu clicked" : "dropdown-menu"} onClick={handleClick}>
            
            {MenuItems.map((item, index) => (
                
                <li key={index}>
                    <Link className="dropdown-link" to={item.path} onClick={() => setClick(false)}>
                        {item.title}
                    </Link>
                </li>
                // <Link className="dropdown-link" to={item.path} onClick={() => setClick(false)}>
                //     <li key={index}> {item.title} </li>
                // </Link>
                
            ))}
            
        </ul>
        
    );

};

export default Dropdown;
