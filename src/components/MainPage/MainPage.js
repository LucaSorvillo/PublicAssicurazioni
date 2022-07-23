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
// MainPage: Elenco clienti con polizza più vicina alla scadenza
const MainPage = () => {

    const [result, setResult] = useState([]);
    
    // search
    const [keyword, setKeyword] = useState("");
    const handleChange = (event) => {
        event.preventDefault();
        setKeyword(event.target.value.toLowerCase());
    };

    // get filtered list
    const resultFiltered = Utils.getFilteredList(result, keyword, Utils.columns.NOME_RAGSOCIALE);

    // Mock
    useEffect(() => {
        (async () => {
            if (!clientiJSON || !polizzeJSON) {
                return;
            }
            // retrieve result (foreach cliente add polizza più scadente)
            const clientiConPolizzaPiuScadente = await clientiJSON.map(cliente => {
                const polizza = polizzeJSON
                    .filter(polizza => cliente.id === polizza.idCliente)
                    // TODO: DA RIVEDEREEE NON PUOI ORDINARE IN MODO INCR SE CI SONO POLIZZE VECCHIE, L'OBIETTIVO é VEDERE QUALE PIU SCADENTE TRA: 
                    // ULTIMA POLIZZA AUTO, ULTIMA POLIZZA PREVIDENZA, ULTIMA POLIZZA VITA
                    .sort((a, b) => a.scadenza < b.scadenza ? -1 : 1)[0];
                return { ...cliente, polizza };
            });
            setResult(clientiConPolizzaPiuScadente);
            // Example result row: { id: 1, nome: "Mario", cognome: "Rossi", ... , polizza: { id: 1, scadenza: "2020-01-01" } }
        })();
    }, []);

    // Real Fetch
    // useEffect(() => {
    //     (async () => {
    //     })();
    // }, []);

    return (

        <div className={styles.container}>

            <div className={styles.searchContainer}>
                <div className={styles.title}> Home </div>
                <div className={styles.input}> <SearchInput placeholder={`Cerca per ${Utils.columns.NOME_RAGSOCIALE}`} onChange={handleChange} /> </div>
            </div>

            <ClienteTable list={resultFiltered} />

        </div>

    );

};

export default MainPage;
