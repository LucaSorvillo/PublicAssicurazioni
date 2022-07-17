// React
import { React, useState } from "react";
import { Link } from "react-router-dom";

// Components
import SortArrow from "components/other/SortArrow";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/Table.module.css";

// MainPageTable: Tabella per Elenco clienti con polizza più vicina alla scadenza
const MainPageTable = ({ list }) => {

	const [sortOrder, setSortOrder] = useState({column: undefined, direction: undefined});

	function changeSortOrder(newColumn) {
		// Utils.getChangedColumnAndDirection(newColumn, prevColumn, prevDirection)
		const updatedSordOrder = Utils.getChangedColumnAndDirection(newColumn, sortOrder.column, sortOrder.direction);
		setSortOrder(updatedSordOrder);
	}

	const result = Utils.getSortedList(list, sortOrder.column, sortOrder.direction);

	if (!list) {
		return null;
	}
	
	return (
		
		<div>
			
			{/* Heading */}
			<div className={styles.heading}>
				{/* Column 1 */}
				<button className={styles.heading_thumbnail} onClick={() => changeSortOrder(Utils.columns.TIPO)}>
					<div> {Utils.columns.TIPO} </div>
					{sortOrder.column === Utils.columns.TIPO && <SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column 1 */}
				<button className={styles.heading_first} onClick={() => changeSortOrder(Utils.columns.NOME_RAGSOCIALE)}>
					<div> {Utils.columns.NOME_RAGSOCIALE} </div>
					{sortOrder.column === Utils.columns.NOME_RAGSOCIALE && <SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column 1 */}
				<button className={styles.heading_medium} onClick={() => changeSortOrder(Utils.columns.POLIZZA)}>
					<div> {Utils.columns.POLIZZA} </div>
					{sortOrder.column === Utils.columns.POLIZZA && <SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column 1 */}
				<button className={styles.heading_medium} onClick={() => changeSortOrder(Utils.columns.COMPAGNIA)}>
					<div> {Utils.columns.COMPAGNIA} </div>
					{sortOrder.column === Utils.columns.COMPAGNIA && <SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column 1 */}
				<button className={styles.heading_medium} onClick={() => changeSortOrder(Utils.columns.PREMIO)}>
					<div> {Utils.columns.PREMIO} </div>
					{sortOrder.column === Utils.columns.PREMIO && <SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column 1 */}
				<button className={styles.heading_last} onClick={() => changeSortOrder(Utils.columns.SCADENZA)}>
					<div> {Utils.columns.SCADENZA} </div>
					{sortOrder.column === Utils.columns.SCADENZA && <SortArrow direction={sortOrder.direction} />}
				</button>

			</div>

			{/* Rows */}
			{result.map((cliente) => (
					
				<Link to={`/clienti/${cliente.id}`} key={cliente.id}>
					<div className={`${styles.row}  ${Utils.isInScadenza(cliente.polizza.scadenza) ? styles.row_red : styles.row_green}`}>
						{/* QUESTION: da aggiungere cliente.polizza.tipo per img? */}
						<div className={styles.thumbnail}> <img src={Utils.getImageByTipo(cliente.tipo, Utils.size.SMALL)} alt="img" /> </div>
						<div className={styles.first}> {Utils.getValueByColumn(cliente, Utils.columns.NOME_RAGSOCIALE)} </div>
						<div className={styles.medium}> {cliente.polizza.polizza} </div>
						<div className={styles.medium}> {cliente.polizza.compagnia} </div>
						<div className={styles.medium}> € {cliente.polizza.premio} </div>
						<div className={styles.last}> <p className={Utils.isInScadenza(cliente.polizza.scadenza) ? styles.red : styles.green}> {cliente.polizza.scadenza} </p> </div>
					</div>
				</Link>
				
			))}

		</div>
	);

};



export default MainPageTable;
