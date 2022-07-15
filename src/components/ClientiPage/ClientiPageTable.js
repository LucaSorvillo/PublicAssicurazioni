// React
import { React, useState } from "react";
import { Link } from "react-router-dom";

// Components
import SortArrow from "components/other/SortArrow";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/Table.module.css";


const ClientiPageTable = ({ list }) => {
	
	const [sortOrder, setSortOrder] = useState({column: undefined, direction: undefined});

	function changeSortOrder(newColumn) {
		// Utils.getChangedColumnAndDirection(newColumn, prevColumn, prevDirection)
		const updatedSordOrder = Utils.getChangedColumnAndDirection(newColumn, sortOrder.column, sortOrder.direction);
		setSortOrder(updatedSordOrder);
	}
	
	// Utils.getSortedList(list, column, keyword)
	const clienti = Utils.getSortedList(list, sortOrder.column, sortOrder.direction);

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
				<button className={styles.heading_medium} onClick={() => changeSortOrder(Utils.columns.TEL)}>
					<div> {Utils.columns.EMAIL} </div>
					{sortOrder.column === Utils.columns.TEL && <SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column 1 */}
				<button className={styles.heading_last} onClick={() => changeSortOrder(Utils.columns.TEL)}>
					<div> {Utils.columns.TEL} </div>
					{sortOrder.column === Utils.columns.TEL && <SortArrow direction={sortOrder.direction} />}
				</button>
			</div>

			{/* Rows */}
			{clienti.map((cliente) => (
				<Link to={`/clienti/${cliente.id}`} key={cliente.id}>
					{/* <div className={`${styles.row}  ${Utils.isInScadenza(cliente.scadenza) ? styles.row_red : styles.row_green}`}> */}
					<div className={styles.row}>
						<div className={styles.thumbnail}> <img src={Utils.getImageByTipo(cliente.tipo, Utils.size.SMALL)} alt="img" /> </div>
						<div className={styles.first}> {Utils.getValueByColumn(cliente, Utils.columns.NOME_RAGSOCIALE)} </div>
						<div className={styles.medium}> {cliente.email} </div>
						<div className={styles.last}> <p> {cliente.tel} </p> </div>
					</div>
				</Link>
			))}

		</div>
		
	);

};


export default ClientiPageTable;
