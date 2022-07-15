// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/DetailsPage.module.css";

const ClienteDetailsPageInfo = ({ cliente }) => {
    return (
        <>
            {/* persona */}
            {cliente.tipo === Utils.tipo.CLIENTE_PERSONA && (
                <>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.columns.NOME} </div>
                        <div className={styles.details_panel_value}> {cliente.nome} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.columns.COGNOME} </div>
                        <div className={styles.details_panel_value}> {cliente.cognome} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.columns.CF} </div>
                        <div className={styles.details_panel_value}> {cliente.cf} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.columns.DATA_NASCITA} </div>
                        <div className={styles.details_panel_value}> {cliente.dataNascita} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.columns.LUOGO_NASCITA} </div>
                        <div className={styles.details_panel_value}> {cliente.luogoNascita} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.columns.COMUNE_RESIDENZA} </div>
                        <div className={styles.details_panel_value}> {cliente.comuneResidenza} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.columns.INDIRIZZO_RESIDENZA} </div>
                        <div className={styles.details_panel_value}> {cliente.indirizzoResidenza} </div>
                    </div>
                </>
            )}

            {/* azienda */}
            {cliente.tipo === Utils.tipo.CLIENTE_AZIENDA && (
                <>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.columns.RAGIONE_SOCIALE} </div>
                        <div className={styles.details_panel_value}> {cliente.ragioneSociale} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.columns.PIVA} </div>
                        <div className={styles.details_panel_value}> {cliente.pIVA} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.columns.COMUNE_SEDE} </div>
                        <div className={styles.details_panel_value}> {cliente.comuneSede} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.columns.INDIRIZZO_SEDE} </div>
                        <div className={styles.details_panel_value}> {cliente.indirizzoSede} </div>
                    </div>
                </>
            )}

            {/* dati comuni */}
            <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}> {Utils.columns.TEL} </div>
                <div className={styles.details_panel_value}> {cliente.tel} </div>
            </div>
            <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}> {Utils.columns.EMAIL} </div>
                <div className={styles.details_panel_value}> {cliente.email} </div>
            </div>
        </>
    );
};

export default ClienteDetailsPageInfo;
