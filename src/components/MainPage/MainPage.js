// React
import { React, useEffect, useState } from "react";

// Components
import SearchInput from "components/other/SearchInput";
import ClienteTable from "components/MainPage/MainPageTable";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/ListPage.module.css";

// Mock
import clientiJSON from "assets/clienti.json";
import polizzeJSON from "assets/polizze.json";

// Route: /
// MAIN PAGE: PER OGNI CLIENTE -> POLIZZE
const MainPage = () => {

    const [keyword, setKeyword] = useState("");
    const [result, setResult] = useState([]);

    // search
    const handleChange = (event) => {
        event.preventDefault();
        setKeyword(event.target.value.toLowerCase());
    };
    
    // get filtered list
    const resultFiltered = Utils.getFilteredList(result, keyword, Utils.columns.NOME_RAGSOCIALE);

    // Mock Fetch (CLIENTI + POLIZZE)
    useEffect(() => {
        (async () => {
            if (!clientiJSON || !polizzeJSON) {
                return;
            }
            // MOCK
            // retrieve result (foreach cliente add polizze)
            const clientiPiuPolizze = await clientiJSON.map((cliente) => {
                const polizze = polizzeJSON.filter((polizza) => polizza.idCliente === cliente.id);
                return { ...cliente, polizze };
            });
            setResult(clientiPiuPolizze);
        })();
    }, []);


    return (

        <div className={styles.container}>

            <div className={styles.inputContainer}>
                <div className={styles.counts}> Polizze </div>
                <div className={styles.input}>
                    <SearchInput placeholder={`Cerca per ${Utils.columns.NOME_RAGSOCIALE}`} onChange={handleChange} />
                </div>
            </div>

            <ClienteTable list={resultFiltered} />

        </div>

    );
    
};

export default MainPage;
