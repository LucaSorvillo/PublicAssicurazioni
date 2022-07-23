// React
import { React, useEffect, useState } from "react";

// Components
import SearchInput from "components/other/SearchInput";
import VeicoliPageTable from "components/VeicoliPage/VeicoliPageTable";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/ListPage.module.css";

// Mock
import veicoliJSON from "assets/veicoli.json";

// Route: /veicoli
const VeicoliPage = () => {
    
    // states
    const [veicoli, setVeicoli] = useState([]);
    const [keyword, setKeyword] = useState("");
    
    // search
    const handleChange = (event) => {
        event.preventDefault();
        setKeyword(event.target.value.toLowerCase());
    };
    
    // filtered list
    const veicoliFiltered = Utils.getFilteredList(veicoli, keyword, Utils.columns.TARGA);
    
    // mock
    useEffect(() => {
        (async () => {
            setVeicoli(veicoliJSON);
        })();
    }, []);
    
    // render
    return (
        
        // page
        <div className={styles.container}>
            
            {/* title, search */}
            <div className={styles.searchContainer}>
                <div className={styles.title}> Veicoli </div>
                <div className={styles.input}> <SearchInput placeholder={`Cerca per ${Utils.columns.TARGA}`} onChange={handleChange} /> </div>
            </div>
            
            {/* table */}
            <VeicoliPageTable list={veicoliFiltered} />
            
        </div>
    );
    
};

export default VeicoliPage;
