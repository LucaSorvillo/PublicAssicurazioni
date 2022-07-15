// React
import { React, useEffect, useState } from "react";

// Components
import SearchInput from "components/other/SearchInput";
import ClientiPageTable from "components/ClientiPage/ClientiPageTable";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/ListPage.module.css";

// Mock
import clientiJSON from "assets/clienti.json";

// Route: /clienti
const ClientiPage = () => {

    const [clienti, setClienti] = useState([]);
    const [keyword, setKeyword] = useState("");

    // search
    const handleChange = (event) => {
        event.preventDefault();
        setKeyword(event.target.value.toLowerCase());
    };
    
    // get filtered list
    const clientiFiltered = Utils.getFilteredList(clienti, keyword, Utils.columns.NOME_RAGSOCIALE);

    // Mock Fetch (CLIENTI + POLIZZE)
    useEffect(() => {
        (async () => {
            setClienti(clientiJSON);
        })();
    }, []);


    return (

        <div className={styles.container}>

            <div className={styles.inputContainer}>
                <div className={styles.counts}> Clienti </div>
                <div className={styles.input}> <SearchInput placeholder={`Cerca per ${Utils.columns.NOME_RAGSOCIALE}`} onChange={handleChange} /> </div>
            </div>

            <ClientiPageTable list={clientiFiltered} />

        </div>

    );
    
};

export default ClientiPage;
