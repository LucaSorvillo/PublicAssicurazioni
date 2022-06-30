// Images
import imgPersonaSmall from "assets/1.persona_small.jpg";
import imgAziendaSmall from "assets/2.azienda_small.jpg";
import imgAutovetturaSmall from "assets/3.autovettura_small.jpg";
import imgCiclomotoreSmall from "assets/4.ciclomotore_small.jpg";

import imgPersonaBig from "assets/1.persona_big.jpg";
import imgAziendaBig from "assets/2.azienda_big.jpg";
import imgAutovetturaBig from "assets/3.autovettura_big.jpg";
import imgCiclomotoreBig from "assets/4.ciclomotore_big.jpg";

// Libraries
import moment from "moment";

const Utils = {};

// ----------------------------------------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------------------------------------

Utils.giorniDiAvviso = 30;

Utils.direction = {
    INCR: "incr",
    DECR: "decr"
};



Utils.tipo = {
    CLIENTE_PERSONA: "cliente_persona",
    CLIENTE_AZIENDA: "cliente_azienda",
    VEICOLO_AUTOVETTURA: "veicolo_autovettura",
    VEICOLO_CICLOMOTORE: "veicolo_ciclomotore",
    VEICOLO_AUTOCARRO: "veicolo_ciclomotore",
    POLIZZA_AUTO: "polizza_auto",
    POLIZZA_VITA: "polizza_vita"
};

Utils.Columns = {
    TIPO: "Tipo",
    NOME_RAGSOCIALE: "Nome/Ragione Sociale",

    CF: "Codice Fiscale",
    NOME: "Nome",
    COGNOME: "Cognome",
    DATA_NASCITA: "Data di Nascita",
    LUOGO_NASCITA: "Luogo di Nascita",
    COMUNE_RESIDENZA: "Comune di Residenza",
    INDIRIZZO_RESIDENZA: "Indirizzo di Residenza",

    PIVA: "Partita IVA",
    RAGIONE_SOCIALE: "Ragione Sociale",
    COMUNE_SEDE: "Comune di Sede",
    INDIRIZZO_SEDE: "Indirizzo di Sede",

    TEL: "Telefono",
    EMAIL: "Email",

    POLIZZA: "Polizza",
    COMPAGNIA: "Compagnia",
    PREMIO: "Premio",
    SCADENZA: "Scadenza",
};

// ----------------------------------------------------------------------------------------------------
// Functions
// ----------------------------------------------------------------------------------------------------

// used in getValueByColumn to get field/multiple fields
Utils.getJsonFieldByColumn = function (column) {
    switch (column) {
        
        case Utils.Columns.TIPO:
            return "tipo";
        case Utils.Columns.NOME_RAGSOCIALE:
            return ["nome", "cognome", "ragioneSociale"];
            
        case Utils.Columns.CF:
            return "cf";
        case Utils.Columns.NOME:
            return "nome";
        case Utils.Columns.COGNOME:
            return "cognome";
        case Utils.Columns.DATA_NASCITA:
            return "dataNascita";
        case Utils.Columns.LUOGO_NASCITA:
            return "luogoNascita";
        case Utils.Columns.COMUNE_RESIDENZA:
            return "comuneResidenza";
        case Utils.Columns.INDIRIZZO_RESIDENZA:
            return "indirizzoResidenza";
            
        case Utils.Columns.PIVA:
            return "pIVA";
        case Utils.Columns.RAGIONE_SOCIALE:
            return "ragioneSociale";
        case Utils.Columns.COMUNE_SEDE:
            return "comuneSede";
        case Utils.Columns.INDIRIZZO_SEDE:
            return "indirizzoSede";
            
        case Utils.Columns.TEL:
            return "tel";
        case Utils.Columns.EMAIL:
            return "email";
            
        case Utils.Columns.POLIZZA:
            return "polizza";
        case Utils.Columns.COMPAGNIA:
            return "compagnia";
        case Utils.Columns.PREMIO:
            return "premio";
        case Utils.Columns.SCADENZA:
            return "scadenza";
        default:
            return null;
    }
};



// used for multifields, dates, etc
Utils.getValueByColumn = function (record, column) {
    
    // get field
    const field = Utils.getJsonFieldByColumn(column);
    
    // multiple fields
    if (Array.isArray(field)) {
        let value = "";
        field.map((singleField) => 
            record[singleField] ? value += `${record[singleField]} ` : null
        );
        return value;
    }
    
    // date
    if (moment(record[field], "DD/MM/YYYY").isValid()) {
        return new Date(moment(record[field], "DD/MM/YYYY").format("YYYY-MM-DD"));
    }
    
    // normal
    return record[field];
    
};

// used in tables for sorting
Utils.getSortedList = function (list, column, direction) {

    // if no direction or list empty
    if (!direction || !list || list.length === 0) {
        return list;
    }
    
    // sort
    list = [...list].sort((a, b) => {
        let valueA = Utils.getValueByColumn(a, column);
        let valueB = Utils.getValueByColumn(b, column);
        return valueA < valueB ? -1 : 1;
    });
    
    // if tipo reverse
    if (column === Utils.Columns.TIPO) {
        list = [...list].reverse();
    }

    // if decr order
    if (direction === Utils.direction.DECR) {
        list = [...list].reverse();
    }
    
    return list;

};

// used in tables for filtering
Utils.getFilteredList = function (list, column, keyword) {
    return [...list].filter((record) => {
        const value = Utils.getValueByColumn(record, column)
        return value.toLowerCase().includes(keyword.toLowerCase());
    });
};

// used in tables and detailsPage
Utils.getImageByTipo = function (tipo, size) {
    if (size === undefined) {
        size = 1;
    }
    switch (tipo) {
        case Utils.tipo.CLIENTE_PERSONA:
            return size ? imgPersonaBig : imgPersonaSmall;
        case Utils.tipo.CLIENTE_AZIENDA:
            return size ? imgAziendaBig : imgAziendaSmall;
        case Utils.tipo.VEICOLO_AUTOVETTURA:
            return size ? imgAutovetturaBig : imgAutovetturaSmall;
        case Utils.tipo.VEICOLO_CICLOMOTORE:
            return size ? imgCiclomotoreBig : imgCiclomotoreSmall;
        default:
            return null;
    }
};

// used in tables for validation
Utils.isInScadenza = function (stringaDataScadenza) {
    const giorniDiAvviso = Utils.giorniDiAvviso;
    const dataScadenza = new Date(moment(stringaDataScadenza, "DD/MM/YYYY").format("YYYY-MM-DD"));
    const oggi = new Date();
    const dataCheck = new Date(moment(oggi).add(giorniDiAvviso, "days"));
    return dataCheck >= dataScadenza;
};



export default Utils;
