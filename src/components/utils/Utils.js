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

// img autocarro


// Libraries
import moment from "moment";


const Utils = {};

// ----------------------------------------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------------------------------------

Utils.size = {
    SMALL: 0,
    BIG: 1
}

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
    VEICOLO_AUTOCARRO: "veicolo_autocarro",
    
    POLIZZA_AUTO: "polizza_auto",
    POLIZZA_VITA: "polizza_vita",
    POLIZZA_PREVIDENZA: "polizza_previdenza"
};

Utils.columns = {
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

// Used to get json field/fields from selected column table
Utils.getJsonFieldByColumn = function (column) {
    switch (column) {
        
        case Utils.columns.TIPO:
            return "tipo";
        case Utils.columns.NOME_RAGSOCIALE:
            return ["nome", "cognome", "ragioneSociale"];
            
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
            
        case Utils.columns.PIVA:
            return "pIVA";
        case Utils.columns.RAGIONE_SOCIALE:
            return "ragioneSociale";
        case Utils.columns.COMUNE_SEDE:
            return "comuneSede";
        case Utils.columns.INDIRIZZO_SEDE:
            return "indirizzoSede";
            
        case Utils.columns.TEL:
            return "tel";
        case Utils.columns.EMAIL:
            return "email";
            
        case Utils.columns.POLIZZA:
            return "polizza";
        case Utils.columns.COMPAGNIA:
            return "compagnia";
        case Utils.columns.PREMIO:
            return "premio";
        case Utils.columns.SCADENZA:
            return "scadenza";
            
        default:
            return null;
    }
};

// Used to get unified value from json fields to allow data comparison
Utils.getValueByColumn = function (record, column) {
    
    // get field/fields
    const field = Utils.getJsonFieldByColumn(column);
    
    // multiple fields: get unified value summing fields
    if (Array.isArray(field)) {
        let value = "";
        field.map((singleField) => 
            record[singleField] ? value += `${record[singleField]} ` : null
        );
        return value;
    }
    
    // date: get JS date object formatted to allow comparison
    if (moment(record[field], "DD/MM/YYYY").isValid()) {
        return new Date(moment(record[field], "DD/MM/YYYY").format("YYYY-MM-DD"));
    }
    
    // generic value
    return record[field];  
};

// Used in tables for searching by keyword on specified column
Utils.getFilteredList = function (list, keyword, column) {
    if (!list || list.length === 0 || !keyword || !column) {
        return list;
    }
    return [...list].filter((record) => {
        const value = Utils.getValueByColumn(record, column)
        return value.toLowerCase().includes(keyword.toLowerCase());
    });
};

// Used in tables for sorting by selected column and direction
Utils.getSortedList = function (list, column, direction) {

    if (!list || list.length === 0 || !column || !direction) {
        return list;
    }
    
    // sort
    list = [...list].sort((a, b) => {
        let valueA = Utils.getValueByColumn(a, column);
        let valueB = Utils.getValueByColumn(b, column);
        return valueA < valueB ? -1 : 1;
    });
    
    // if tipo reverse
    if (column === Utils.columns.TIPO) {
        list = [...list].reverse();
    }

    // if decr order
    if (direction === Utils.direction.DECR) {
        list = [...list].reverse();
    }
    return list;
};

// Used to get correct image by tipo and size (default size: big)
Utils.getImageByTipo = function (tipo, size=Utils.size.BIG) {
    
    switch (tipo) {
        
        case Utils.tipo.CLIENTE_PERSONA:
            return size ? imgPersonaBig : imgPersonaSmall;
        case Utils.tipo.CLIENTE_AZIENDA:
            return size ? imgAziendaBig : imgAziendaSmall;
            
        case Utils.tipo.POLIZZA_VITA:
            return size ? imgCiclomotoreBig : imgCiclomotoreSmall;
        case Utils.tipo.POLIZZA_PREVIDENZA:
            return size ? imgCiclomotoreBig : imgCiclomotoreSmall;
        
        case Utils.tipo.VEICOLO_AUTOVETTURA:
            return size ? imgAutovetturaBig : imgAutovetturaSmall;
        case Utils.tipo.VEICOLO_AUTOCARRO:
            return size ? imgAutocarroBig : imgAutocarroSmall;
        case Utils.tipo.VEICOLO_CICLOMOTORE:
            return size ? imgCiclomotoreBig : imgCiclomotoreSmall;
            
        default:
            return null;
    }
};

// Used for Polizze Scadenza
Utils.isInScadenza = function (stringDataScadenza) {
    const giorniDiAvviso = Utils.giorniDiAvviso;
    const dataScadenza = new Date(moment(stringDataScadenza, "DD/MM/YYYY").format("YYYY-MM-DD"));
    const oggi = new Date();
    const oggiPiuGiorniDiAvviso = new Date(moment(oggi).add(giorniDiAvviso, "days"));
    // nota: oggi > dataScadenza allora scaduta
    return oggiPiuGiorniDiAvviso >= dataScadenza;
};

// Used only for Tables to handle behaviour of selecting Columns or Direction
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
}



export default Utils;
