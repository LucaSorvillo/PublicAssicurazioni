// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/DetailsPage.module.css";

const ClienteInfo = ({ cliente }) => {
    return (
        <>
            {/* persona */}
            {cliente.tipo === Utils.tipo.CLIENTE_PERSONA && (
                <>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.Columns.NOME} </div>
                        <div className={styles.details_panel_value}> {cliente.nome} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.Columns.COGNOME} </div>
                        <div className={styles.details_panel_value}> {cliente.cognome} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.Columns.CF} </div>
                        <div className={styles.details_panel_value}> {cliente.cf} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.Columns.DATA_NASCITA} </div>
                        <div className={styles.details_panel_value}> {cliente.dataNascita} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.Columns.LUOGO_NASCITA} </div>
                        <div className={styles.details_panel_value}> {cliente.luogoNascita} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.Columns.COMUNE_RESIDENZA} </div>
                        <div className={styles.details_panel_value}> {cliente.comuneResidenza} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.Columns.INDIRIZZO_RESIDENZA} </div>
                        <div className={styles.details_panel_value}> {cliente.indirizzoResidenza} </div>
                    </div>
                </>
            )}

            {/* azienda */}
            {cliente.tipo === Utils.tipo.CLIENTE_AZIENDA && (
                <>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.Columns.RAGIONE_SOCIALE} </div>
                        <div className={styles.details_panel_value}> {cliente.ragioneSociale} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.Columns.PIVA} </div>
                        <div className={styles.details_panel_value}> {cliente.pIVA} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.Columns.COMUNE_SEDE} </div>
                        <div className={styles.details_panel_value}> {cliente.comuneSede} </div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}> {Utils.Columns.INDIRIZZO_SEDE} </div>
                        <div className={styles.details_panel_value}> {cliente.indirizzoSede} </div>
                    </div>
                </>
            )}

            {/* dati comuni */}
            <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}> {Utils.Columns.TEL} </div>
                <div className={styles.details_panel_value}> {cliente.tel} </div>
            </div>
            <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}> {Utils.Columns.EMAIL} </div>
                <div className={styles.details_panel_value}> {cliente.email} </div>
            </div>
        </>
    );
};

export default ClienteInfo;
