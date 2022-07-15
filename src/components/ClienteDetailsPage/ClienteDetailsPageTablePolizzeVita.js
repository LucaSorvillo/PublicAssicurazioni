// React
import { React, useState } from "react";
import { Link } from "react-router-dom";

// Components
import SortArrow from "components/other/SortArrow";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/Table.module.css";




const ClienteDetailsPageTablePolizzeVita = ({ list }) => {

	const [sortOrder, setSortOrder] = useState({column: undefined, direction: undefined});

	function changeSortOrder(newColumn) {
		// Utils.getChangedColumnAndDirection(newColumn, prevColumn, prevDirection)
		const updatedSordOrder = Utils.getChangedColumnAndDirection(newColumn, sortOrder.column, sortOrder.direction);
		setSortOrder(updatedSordOrder);
	}

	const polizzeVita = Utils.getSortedList(list, sortOrder.column, sortOrder.direction);
	
	if (!list) {
		return null;
	}
	
	
	return (
		
		<div>
			
			{/* -------------------------------------------------------------------------------------------------------------- */}
			
			Polizze Vita
			
			<div className={styles.heading}>
				
				<button className={styles.heading_thumbnail} onClick={() => changeSortOrder(Utils.columns.TIPO)}>
					<div> {Utils.columns.TIPO} </div>
					{sortOrder.column === Utils.columns.TIPO && <SortArrow direction={sortOrder.direction} />}
				</button>
				
				<button className={styles.heading_first} onClick={() => changeSortOrder(Utils.columns.POLIZZA)}>
					<div> {Utils.columns.POLIZZA} </div>
					{sortOrder.column === Utils.columns.POLIZZA && <SortArrow direction={sortOrder.direction} />}
				</button>

				<button className={styles.heading_medium} onClick={() => changeSortOrder(Utils.columns.COMPAGNIA)}>
					<div> {Utils.columns.COMPAGNIA} </div>
					{sortOrder.column === Utils.columns.COMPAGNIA && <SortArrow direction={sortOrder.direction} />}
				</button>

				<button className={styles.heading_medium} onClick={() => changeSortOrder(Utils.columns.PREMIO)}>
					<div> {Utils.columns.PREMIO} </div>
					{sortOrder.column === Utils.columns.PREMIO && <SortArrow direction={sortOrder.direction} />}
				</button>

				<button className={styles.heading_last} onClick={() => changeSortOrder(Utils.columns.SCADENZA)}>
					<div> {Utils.columns.SCADENZA} </div>
					{sortOrder.column === Utils.columns.SCADENZA && <SortArrow direction={sortOrder.direction} />}
				</button>

			</div>


			{polizzeVita.map((polizza) => (
				<Link to={`/clienti/${polizza.id}`} key={polizza.id}>
					<div className={`${styles.row}  ${Utils.isInScadenza(polizza.scadenza) ? styles.row_red : styles.row_green}`}>
						
						<div className={styles.thumbnail}> <img src={Utils.getImageByTipo(polizza.tipo, Utils.size.SMALL)} alt="img" /> </div>
						<div className={styles.first}> {polizza.polizza} </div>
						<div className={styles.medium}> {polizza.compagnia} </div>
						<div className={styles.medium}> € {polizza.premio} </div>
						<div className={styles.last}> <p className={Utils.isInScadenza(polizza.scadenza) ? styles.red : styles.green}> {polizza.scadenza} </p>
						</div>

					</div>
				</Link>
			))}
			
			<br></br> <br></br>
			{/* -------------------------------------------------------------------------------------------------------------- */}
			
			

		</div>
	);

};



export default ClienteDetailsPageTablePolizzeVita;
