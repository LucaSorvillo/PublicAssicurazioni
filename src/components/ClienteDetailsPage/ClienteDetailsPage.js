// React
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import ClienteDetailsPageInfo from "components/ClienteDetailsPage/ClienteDetailsPageInfo";
import ClienteDetailsPageTablePolizzeAuto from "components/ClienteDetailsPage/ClienteDetailsPageTablePolizzeAuto";
import ClienteDetailsPageTablePolizzePrevidenza from "components/ClienteDetailsPage/ClienteDetailsPageTablePolizzePrevidenza";
import ClienteDetailsPageTablePolizzeVita from "components/ClienteDetailsPage/ClienteDetailsPageTablePolizzeVita";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/DetailsPage.module.css";
import stylesListPage from "styles/ListPage.module.css";

// Mock
import clientiJSON from "assets/clienti.json";
import polizzeJSON from "assets/polizze.json";
import veicoliJSON from "assets/veicoli.json";

// Route: /clienti/:idCliente
const ClienteDetailsPage = () => {

    const { idCliente } = useParams();
    const [cliente, setCliente] = useState(null);
    const [polizzeAuto, setPolizzeAuto] = useState([]);
    const [polizzePrevidenza, setPolizzePrevidenza] = useState([]);
    const [polizzeVita, setPolizzeVita] = useState([]);
    const [veicoli, setVeicoli] = useState([]);

    useEffect(() => {
        (async () => {
            
            if (!idCliente || !clientiJSON || !polizzeJSON || !veicoliJSON) {
                return;
            }
            
            // MOCK
            // retrieve cliente
            const retrievedCliente = await clientiJSON.find((cliente) => {
                return (cliente.id + "") === idCliente;
            });
            // retrieve all polizze of cliente
            const retrievedPolizze = await polizzeJSON.filter((polizza) => {
                return polizza.idCliente === retrievedCliente.id;
            });
            // retrieve polizze auto
            const retrievedPolizzeAuto = await retrievedPolizze.filter((polizza) => {
                return polizza.tipo === "polizza_auto";
            });
            // retrieve polizze previdenza
            const retrievedPolizzePrevidenza = await retrievedPolizze.filter((polizza) => {
                return polizza.tipo === "polizza_previdenza";
            });
            // retrieve polizze vita
            const retrievedPolizzeVita = await retrievedPolizze.filter((polizza) => {
                return polizza.tipo === "polizza_vita";
            });
            setCliente(retrievedCliente);
            setPolizzeAuto(retrievedPolizzeAuto);
            setPolizzePrevidenza(retrievedPolizzePrevidenza);
            setPolizzeVita(retrievedPolizzeVita);
            
            // FETCH LOCAL SPRING BOOT REST API
            // try {
            //     // fetch data
            //     const response = await fetch(`http://localhost:8080/api/v1/spring-project/heets/findAll`);
            //     // 404 means empty list
            //     if (response.status === 404) {
            //         setHeetsList([]);
            //         return;
            //     }
            //     const data = await response.json();
            //     setHeetsList(data);
            // }
            // // error: server api offline (net::ERR_CONNECTION_REFUSED)
            // catch (error) {
            //     setError("Impossibile caricare i dati.");
            // }
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
                        <h1 className={styles.overview_name}> {Utils.getValueByColumn(cliente, Utils.columns.NOME_RAGSOCIALE)} </h1>
                    </div>
                </div>

                {/* Right Panel */}
                <div className={styles.container_right}>
                    <div className={styles.details_panel}>
                        <h4 className={styles.details_panel_heading}> Dettagli </h4>
                        <ClienteDetailsPageInfo cliente={cliente} />
                    </div>
                </div>

            </div>


            {/* Table */}
            <div className={stylesListPage.container}>

                {/* Bottom */}
                {polizzeAuto.length > 0 && <ClienteDetailsPageTablePolizzeAuto list={polizzeAuto} />}
                {polizzePrevidenza.length > 0 && <ClienteDetailsPageTablePolizzePrevidenza list={polizzePrevidenza} />}
                {polizzePrevidenza.length > 0 && <ClienteDetailsPageTablePolizzeVita list={polizzeVita} />}

            </div>

        </>
    );

};

export default ClienteDetailsPage;
