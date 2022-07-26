// React
import { React, useState } from "react";
import { Link } from "react-router-dom";

// Components
import SortArrow from "components/other/SortArrow";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/Table.module.css";

// Mock
import clientiJSON from "assets/clienti.json";
import polizzeJSON from "assets/polizze.json";
import veicoliJSON from "assets/veicoli.json";

// RicercaPageTable: 
const RicercaPageTable = ({ list }) => {

	const [sortOrder, setSortOrder] = useState({column: undefined, direction: undefined});

	function changeSortOrder(newColumn) {
		// Docs: Utils.getChangedColumnAndDirection(newColumn, prevColumn, prevDirection)
		const updatedSortOrder = Utils.getChangedColumnAndDirection(newColumn, sortOrder.column, sortOrder.direction);
		setSortOrder(updatedSortOrder);
	}

	const result = Utils.getSortedList(list, sortOrder.column, sortOrder.direction);
	// che richiama Utils.getValueByColumn(record, column)
	
	let index = 1;
	
	// mock
	const mock = clientiJSON.map(cliente => {
		const polizza = polizzeJSON.map(polizza => {
			if (polizza.idCliente === cliente.id) {
				return polizza;
			}
		}).sort((a, b) => a.scadenza < b.scadenza ? -1 : 1)[0];
		const veicolo = veicoliJSON[index++];
		return { ...cliente, polizza, veicolo };
	});
	console.log(mock);
	

	// if (!list) {
	// 	return null;
	// }
	
	return (
		
		<div>
			
			{/* Heading */}
			<div className={styles.heading}>
				{/* Column Thumbnail */}
				<button className={styles.heading_thumbnail} onClick={() => 
					changeSortOrder(Utils.columns.TIPO)}>
					<div> {Utils.columns.TIPO} </div>
					{sortOrder.column === Utils.columns.TIPO && 
					<SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column First */}
				<button className={styles.heading_first} onClick={() => 
					changeSortOrder(Utils.columns.NOME_RAGSOCIALE)}>
					<div> {Utils.columns.NOME_RAGSOCIALE} </div>
					{sortOrder.column === Utils.columns.NOME_RAGSOCIALE && 
					<SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Tel */}
				<button className={styles.heading_medium} onClick={() => 
					changeSortOrder(Utils.columns.TEL)}>
					<div> {Utils.columns.TEL} </div>
					{sortOrder.column === Utils.columns.TEL && 
					<SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column Medium */}
				<button className={styles.heading_medium} onClick={() => 
					changeSortOrder(Utils.columns.POLIZZA)}>
					<div> {Utils.columns.POLIZZA} </div>
					{sortOrder.column === Utils.columns.POLIZZA && 
					<SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column Medium */}
				<button className={styles.heading_medium} onClick={() => 
					changeSortOrder(Utils.columns.COMPAGNIA)}>
					<div> {Utils.columns.COMPAGNIA} </div>
					{sortOrder.column === Utils.columns.COMPAGNIA && 
					<SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column Medium */}
				<button className={styles.heading_medium} onClick={() => 
					changeSortOrder(Utils.columns.PREMIO)}>
					<div> {Utils.columns.PREMIO} </div>
					{sortOrder.column === Utils.columns.PREMIO && 
					<SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Targa */}
				<button className={styles.heading_medium} onClick={() => 
					changeSortOrder(Utils.columns.TARGA)}>
					<div> {Utils.columns.TARGA} </div>
					{sortOrder.column === Utils.columns.TARGA && 
					<SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column Last */}
				<button className={styles.heading_last} onClick={() => 
					changeSortOrder(Utils.columns.SCADENZA)}>
					<div> {Utils.columns.SCADENZA} </div>
					{sortOrder.column === Utils.columns.SCADENZA && 
					<SortArrow direction={sortOrder.direction} />}
				</button>
			</div>

			{/* Rows */}
			{/* {result.map((cliente) => ( */}
					
				<>
				{/* <Link to={`/clienti/${cliente.id}`} key={cliente.id}> */}
					
					{/* Row RowRed|RowGreen */}
					{/* <div className={`${styles.row}  ${Utils.isInScadenza(cliente.polizza.scadenza) ? styles.row_red : styles.row_green}`}>
						<div className={styles.thumbnail}> <img src={Utils.getImageByTipo(cliente.veicolo.tipo)} alt="img" /> </div>
						<div className={styles.first}> {Utils.getValueByColumn(cliente, Utils.columns.NOME_RAGSOCIALE)} </div>
						<div className={styles.medium}> {cliente.tel} </div>
						<div className={styles.medium}> {cliente.polizza.polizza} </div>
						<div className={styles.medium}> {cliente.polizza.compagnia} </div>
						<div className={styles.medium}> € {cliente.polizza.premio} </div>
						<div className={styles.medium}> € {cliente.veicolo.targa} </div>
						<div className={styles.last}> <p className={Utils.isInScadenza(cliente.polizza.scadenza) ? styles.red : styles.green}> {cliente.polizza.scadenza} </p> </div>
					</div> */}
					
					{/* 1 Row RowRed|RowGreen */}
					<div className={`${styles.row}  ${Utils.isInScadenza(mock[0].polizza.scadenza) ? styles.row_red : styles.row_green}`}>
						<div className={styles.thumbnail}> <img src={Utils.getImageByTipo(Utils.tipo.VEICOLO_AUTOCARRO)} alt="img" /> </div>
						<div className={styles.first}> {Utils.getValueByColumn(mock[0], Utils.columns.NOME_RAGSOCIALE)} </div>
						<div className={styles.medium}> {mock[0].tel} </div>
						<div className={styles.medium}> {mock[0].polizza.polizza} </div>
						<div className={styles.medium}> {mock[0].polizza.compagnia} </div>
						<div className={styles.medium}> € {mock[0].polizza.premio} </div>
						<div className={styles.medium}> {mock[0].veicolo.targa} </div>
						<div className={styles.last}> <p className={Utils.isInScadenza(mock[0].polizza.scadenza) ? styles.red : styles.green}> {mock[0].polizza.scadenza} </p> </div>
					</div>
					
					{/* 2 Row RowRed|RowGreen */}
					<div className={`${styles.row}  ${Utils.isInScadenza(mock[1].polizza.scadenza) ? styles.row_red : styles.row_green}`}>
						<div className={styles.thumbnail}> <img src={Utils.getImageByTipo(Utils.tipo.VEICOLO_AUTOVETTURA)} alt="img" /> </div>
						<div className={styles.first}> {Utils.getValueByColumn(mock[1], Utils.columns.NOME_RAGSOCIALE)} </div>
						<div className={styles.medium}> {mock[1].tel} </div>
						<div className={styles.medium}> {mock[1].polizza.polizza} </div>
						<div className={styles.medium}> {mock[1].polizza.compagnia} </div>
						<div className={styles.medium}> € {mock[1].polizza.premio} </div>
						<div className={styles.medium}> {mock[1].veicolo.targa} </div>
						<div className={styles.last}> <p className={Utils.isInScadenza(mock[1].polizza.scadenza) ? styles.red : styles.green}> {mock[1].polizza.scadenza} </p> </div>
					</div>
					
					
					
					
					
				{/* </Link> */}
				</>
				
			{/* ))} */}

		</div>
	);

};



export default RicercaPageTable;
