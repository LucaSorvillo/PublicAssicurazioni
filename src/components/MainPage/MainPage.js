// React
import { React, useEffect, useState } from "react";

// Components
import SearchInput from "components/other/SearchInput";
import ClienteTable from "components/MainPage/ClienteTable";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/ListPage.module.css";

// Mock
import clientiJSON from "assets/clienti.json";


const MainPage = () => {

    const [clienti, setClienti] = useState([]);
    const [keyword, setKeyword] = useState("");

    // handle keyword
    const handleChange = (event) => {
        event.preventDefault();
        setKeyword(event.target.value.toLowerCase());
    };

    const clientiFiltered = Utils.getFilteredList(clienti, Utils.Columns.NOME_RAGSOCIALE, keyword);

    

    // Mock Fetch (CLIENTI + POLIZZE)
    useEffect(() => {
        (async () => {
            setClienti(clientiJSON);
        })();
    }, []);


    return (

        <div className={styles.container}>

            <div className={styles.inputContainer}>
                <div className={styles.counts}> Clienti - Polizze </div>
                <div className={styles.input}>
                    <SearchInput placeholder={`Cerca per ${Utils.Columns.NOME_RAGSOCIALE}`} onChange={handleChange} />
                </div>
            </div>

            <ClienteTable list={clientiFiltered} />

        </div>

    );
    
};

export default MainPage;
