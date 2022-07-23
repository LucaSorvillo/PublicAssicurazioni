// Images
import imgPersonaSmall from "assets/cliente_persona_small.jpg";
import imgPersonaBig from "assets/cliente_persona_big.jpg";

import imgAziendaSmall from "assets/cliente_azienda_small.jpg";
import imgAziendaBig from "assets/cliente_azienda_big.jpg";

import imgAutovetturaSmall from "assets/veicolo_autovettura_small.jpg";
import imgAutovetturaBig from "assets/veicolo_autovettura_big.jpg";

import imgAutocarroSmall from "assets/veicolo_autocarro_small.jpg";
import imgAutocarroBig from "assets/veicolo_autocarro_big.jpg";

import imgCiclomotoreSmall from "assets/veicolo_ciclomotore_small.jpg";
import imgCiclomotoreBig from "assets/veicolo_ciclomotore_big.jpg";

// Libraries
import moment from "moment";


const Utils = {};

// ----------------------------------------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------------------------------------

Utils.giorniDiAvviso = 10;
// Utils.giorniDiCopertura = 15;

Utils.size = {
    SMALL: 0,
    BIG: 1
}

Utils.direction = {
    INCR: "incr",
    DECR: "decr"
};

Utils.tipo = {
    // cliente
    CLIENTE_PERSONA: "cliente_persona",
    CLIENTE_AZIENDA: "cliente_azienda",
    // polizza
    POLIZZA_AUTO: "polizza_auto",
    POLIZZA_VITA: "polizza_vita",
    POLIZZA_PREVIDENZA: "polizza_previdenza",
    // veicolo
    VEICOLO_AUTOVETTURA: "veicolo_autovettura",
    VEICOLO_CICLOMOTORE: "veicolo_ciclomotore",
    VEICOLO_AUTOCARRO: "veicolo_autocarro",
};

Utils.columns = {
    // generic
    TIPO: "Tipo",
    // multivalue
    NOME_RAGSOCIALE: "Nome/Rag.Sociale",
    MARCA_MODELLO: "Marca/Modello",
    // cliente_persona
    CF: "Codice Fiscale",
    NOME: "Nome",
    COGNOME: "Cognome",
    DATA_NASCITA: "Data di Nascita",
    LUOGO_NASCITA: "Luogo di Nascita",
    COMUNE_RESIDENZA: "Comune di Residenza",
    INDIRIZZO_RESIDENZA: "Indirizzo di Residenza",
    // cliente_azienda
    PIVA: "Partita IVA",
    RAGIONE_SOCIALE: "Ragione Sociale",
    COMUNE_SEDE: "Comune di Sede",
    INDIRIZZO_SEDE: "Indirizzo di Sede",
    // cliente
    TEL: "Telefono",
    EMAIL: "Email",
    // polizza
    POLIZZA: "Polizza",
    COMPAGNIA: "Compagnia",
    PREMIO: "Premio",
    SCADENZA: "Scadenza",
    // veicolo
    TARGA: "Targa",
    MARCA: "Marca",
    MODELLO: "Modello",
};

// ----------------------------------------------------------------------------------------------------
// Functions
// ----------------------------------------------------------------------------------------------------

// Utilizzato per mappare colonne a campi json (a volte una colonna corrisponde a più campi)
Utils.getJsonFieldByColumn = function (column) {
    switch (column) {
        // generic
        case Utils.columns.TIPO:
            return "tipo";
        // multivalue
        case Utils.columns.NOME_RAGSOCIALE:
            return ["nome", "cognome", "ragioneSociale"];
        case Utils.columns.MARCA_MODELLO:
            return ["marca", "modello"];
        // cliente_persona
        case Utils.columns.CF:
            return "cf";
        case Utils.columns.NOME:
            return "nome";
        case Utils.columns.COGNOME:
            return "cognome";
        case Utils.columns.DATA_NASCITA:
            return "dataNascita";
        case Utils.columns.LUOGO_NASCITA:
            return "luogoNascita";
        case Utils.columns.COMUNE_RESIDENZA:
            return "comuneResidenza";
        case Utils.columns.INDIRIZZO_RESIDENZA:
            return "indirizzoResidenza";
        // cliente_azienda
        case Utils.columns.PIVA:
            return "pIVA";
        case Utils.columns.RAGIONE_SOCIALE:
            return "ragioneSociale";
        case Utils.columns.COMUNE_SEDE:
            return "comuneSede";
        case Utils.columns.INDIRIZZO_SEDE:
            return "indirizzoSede";
        // cliente
        case Utils.columns.TEL:
            return "tel";
        case Utils.columns.EMAIL:
            return "email";
        // polizza
        case Utils.columns.POLIZZA:
            return "polizza";
        case Utils.columns.COMPAGNIA:
            return "compagnia";
        case Utils.columns.PREMIO:
            return "premio";
        case Utils.columns.SCADENZA:
            return "scadenza";
        // veicolo
        case Utils.columns.TARGA:
            return "targa";
        case Utils.columns.MARCA:
            return "marca";
        case Utils.columns.MODELLO:
            return "modello";
        default:
            return null;
    }
};

// Date: Check date validity
Utils.isValidDate = function (dateObject) {
    return dateObject && dateObject.toString() !== "Invalid Date";
};

// Date: Used to get JS date object to allow comparison (date format required: DD/MM/YYYY)
Utils.getDateFromString = function (dateString) {
    try {
        const [day, month, year] = dateString.split("/");
        const date = new Date(year, month-1, day); // the month is 0-indexed
        return date;
    } catch (error) {
        return "Invalid Date";
    }      
};

// Value: Used to get unified value from json fields to allow data comparison
Utils.getValueByColumn = function (record, column) {
    
    // get field/fields
    const field = Utils.getJsonFieldByColumn(column);
    
    // case multiple fields: get unified value summing foreach field
    if (Array.isArray(field)) {
        let value = "";
        field.map((singleField) =>
            record[singleField] ? value += `${record[singleField]} ` : null
        );
        return value;
    }
    
    // case date: get JS date object
    const date = Utils.getDateFromString(record[field]);
    if (Utils.isValidDate(date)) {
        return date;
    }
    
    // generic value
    return record[field];
};

// Filter: Used in tables for searching by keyword on specified column
Utils.getFilteredList = function (list, keyword, column) {
    // check
    if (!list || list.length === 0 || !keyword || !column) {
        return list;
    }
    // filter converting to string
    return [...list].filter((record) => {
        const value = Utils.getValueByColumn(record, column);
        return value.toString().toLowerCase().includes(keyword.toLowerCase());
    });
};

// Sort: Used in tables for sorting by selected column and direction
Utils.getSortedList = function (list, column, direction) {
    // check
    if (!list || list.length === 0 || !column || !direction) {
        return list;
    }
    // sort for all data types
    list = [...list].sort((a, b) => {
        let valueA = Utils.getValueByColumn(a, column);
        let valueB = Utils.getValueByColumn(b, column);
        return valueA < valueB ? -1 : 1;
    });
    // if column tipo: reverse
    if (column === Utils.columns.TIPO) {
        list = [...list].reverse();
    }
    // if direction decr: reverse
    if (direction === Utils.direction.DECR) {
        list = [...list].reverse();
    }
    return list;
};

// Image: Used to get correct image by tipo and size (default size: small)
Utils.getImageByTipo = function (tipo, size = Utils.size.SMALL) {
    switch (tipo) {
        // cliente
        case Utils.tipo.CLIENTE_PERSONA:
            return size === Utils.size.SMALL ? imgPersonaSmall : imgPersonaBig;
        case Utils.tipo.CLIENTE_AZIENDA:
            return size === Utils.size.SMALL ? imgAziendaSmall : imgAziendaBig;
        // polizza
        // TODO ****************************
        case Utils.tipo.POLIZZA_VITA:
            return size === Utils.size.SMALL ? imgCiclomotoreSmall : imgCiclomotoreBig;
        // TODO ****************************
        case Utils.tipo.POLIZZA_PREVIDENZA:
            return size === Utils.size.SMALL ? imgCiclomotoreSmall : imgCiclomotoreBig;
        // veicolo
        case Utils.tipo.VEICOLO_AUTOVETTURA:
            return size === Utils.size.SMALL ? imgAutovetturaSmall : imgAutovetturaBig;
        case Utils.tipo.VEICOLO_AUTOCARRO:
            return size === Utils.size.SMALL ? imgAutocarroSmall : imgAutocarroBig;
        case Utils.tipo.VEICOLO_CICLOMOTORE:
            return size === Utils.size.SMALL ? imgCiclomotoreSmall : imgCiclomotoreBig;
        default:
            return null;
    }
};

// Scadenza: Used to check Scadenze
Utils.isInScadenza = function (dataScadenzaString) {
    // |---------------------------------------|-----------------|-------|
    // | dataScadenza >= oggi                  |     non scaduta | FALSE |
    // | dataScadenza >= oggiPiuGiorniDiAvviso | non in scadenza | FALSE |
    // | dataScadenza <  oggi                  |         scaduta |  TRUE |
    // | dataScadenza <  oggiPiuGiorniDiAvviso |     in scadenza |  TRUE |
    // |---------------------------------------|-----------------|-------|
    // // OLD VERSION
    // // controlla formato data
    // if (moment(stringDataScadenza, "DD/MM/YYYY").isValid()) {
    //     const dataScadenza = new Date(moment(stringDataScadenza, "DD/MM/YYYY").format("YYYY-MM-DD"));
    //     const dataScadenzaMenoGiorniDiAvviso = new Date(moment(dataScadenza).subtract(Utils.giorniDiAvviso, "days"));
    //     const oggi = new Date();
    //     return oggi >= dataScadenzaMenoGiorniDiAvviso;
    // }
    const dataScadenza = Utils.getDateFromString(dataScadenzaString);
    if (!Utils.isValidDate(dataScadenza)) {
        throw new Error("Data Scadenza is Invalid date!");
    }
    const dataScadenzaMenoGiorniDiAvviso = new Date(moment(dataScadenza).subtract(Utils.giorniDiAvviso, "days"));
    const oggi = new Date();
    return oggi >= dataScadenzaMenoGiorniDiAvviso;
};
    
// SortOrder: Used only for Tables to handle behaviour of selecting Columns or Direction
// previous function name: setColumnAndDirection
Utils.getChangedColumnAndDirection = function (newColumn, prevColumn, prevDirection) {
    // different column: change column and reset direction
    if (newColumn !== prevColumn) {
        return {
            column: newColumn,
            direction: Utils.direction.INCR
        };
    }
    // same column: change direction
    let newDirection;
    switch (prevDirection) {
        case undefined:
            newDirection = Utils.direction.INCR;
            break;
        case Utils.direction.INCR:
            newDirection = Utils.direction.DECR;
            break;
        case Utils.direction.DECR:
            newDirection = undefined;
            break;
        default:
            break;
    }
    return {
        column: prevColumn,
        direction: newDirection
    };
};



export default Utils;
