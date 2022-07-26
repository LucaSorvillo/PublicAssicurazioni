// React
import { React, useEffect, useState } from "react";

// Components
import SearchInput from "components/other/SearchInput";
import RicercaPageTable from "components/RicercaPage/RicercaPageTable";
import ClientiTable from "components/MainPage/MainPageTable";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/SecondListPage.module.css";

// Mock
import clientiJSON from "assets/clienti.json";
import polizzeJSON from "assets/polizze.json";

// RicercaPage: /ricerca
// 
const RicercaPage = () => {

    const [result, setResult] = useState([]);
    const [keyword, setKeyword] = useState("");
    
    // search
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
                    .sort((a, b) => a.scadenza < b.scadenza ? -1 : 1)[0];
                return { ...cliente, polizza };
            });
            setResult(clientiConPolizzaPiuScadente);
        })();
    }, []);

    // Real Fetch
    // useEffect(() => {
    //     (async () => {
    //     })();
    // }, []);

    return (

        <div className={styles.container}>

            
                <div className={styles.title}> Ricerca 🔍 </div>
                
                <div className={styles.grid}>
                
                <div className={styles.input}> <SearchInput placeholder={`Cerca per ${Utils.columns.NOME_RAGSOCIALE}`} onChange={handleChange} /> </div>
                <div className={styles.input}> <SearchInput placeholder={`Cerca per ${Utils.columns.TARGA}`} onChange={handleChange} /> </div>
                <div className={styles.input}> <SearchInput placeholder={`Cerca per ${Utils.columns.POLIZZA}`} onChange={handleChange} /> </div>
                <div className={styles.input}> <SearchInput placeholder={`Cerca per ${Utils.columns.SCADENZA}` + " Inizio"} onChange={handleChange} /> </div>
                <div className={styles.input}> <SearchInput placeholder={`Cerca per ${Utils.columns.SCADENZA}` + " Fine"} onChange={handleChange} /> </div>
                
                </div>
            

            <RicercaPageTable list={resultFiltered} />
            {/* <ClientiTable list={resultFiltered} /> */}
            

        </div>

    );

};

export default RicercaPage;
