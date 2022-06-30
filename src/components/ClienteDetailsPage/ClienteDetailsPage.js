// React
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import ClienteInfo from "components/ClienteDetailsPage/ClienteInfo";
import PolizzaTable from "components/ClienteDetailsPage/PolizzaTable";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/DetailsPage.module.css";
import stylesListPage from "styles/ListPage.module.css";

// Mock
import clientiJSON from "assets/clienti.json";
import polizzeJSON from "assets/polizze.json";
import veicoliJSON from "assets/veicoli.json";


const ClienteDetailsPage = () => {

    const { id } = useParams();
    const [cliente, setCliente] = useState(null);
    const [polizze, setPolizze] = useState([]);
    const [veicoli, setVeicoli] = useState([]);

    // Mock Fetch (CLIENTI + POLIZZE)
    useEffect(() => {
        (async () => {
            if (!id || !clientiJSON || !polizzeJSON) {
                return;
            }
            const retrievedCliente = await clientiJSON.find(cliente => id === ("" + cliente.id));
            const retrievedPolizze = await polizzeJSON.filter(polizza => retrievedCliente.id === polizza.idCliente);
            setCliente(retrievedCliente);
            setPolizze(retrievedPolizze);
        })();
    }, []);

    if (!cliente) {
        return null;
    }

    return (

        <>
            <div className={styles.container}>

                {/* Left Panel */}
                <div className={styles.container_left}>
                    <div className={styles.overview_panel}>
                        <img src={Utils.getImageByTipo(cliente.tipo)} alt="img" />
                        <h1 className={styles.overview_name}> {Utils.getValueByColumn(cliente, Utils.Columns.NOME_RAGSOCIALE)} </h1>
                    </div>
                </div>

                {/* Right Panel */}
                <div className={styles.container_right}>
                    <div className={styles.details_panel}>
                        <h4 className={styles.details_panel_heading}> Dettagli </h4>
                        <ClienteInfo cliente={cliente} />
                    </div>
                </div>

            </div>


            {/* Table */}
            <div className={stylesListPage.container}>

                {/* Bottom */}
                <PolizzaTable list={polizze} />

            </div>

        </>
    );

};

export default ClienteDetailsPage;
