// React
import { React, useState } from "react";
import { Link } from "react-router-dom";

// Components
import SortArrow from "components/other/SortArrow";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/Table.module.css";



// Table for ClienteDetailsPage-PolizzeAuto contains data: VeicoliConPolizze
const ClienteDetailsPageTablePolizzeAuto = ({ list }) => {

	const [sortOrder, setSortOrder] = useState({column: undefined, direction: undefined});

	function changeSortOrder(newColumn) {
		// Utils.getChangedColumnAndDirection(newColumn, prevColumn, prevDirection)
		const updatedSortOrder = Utils.getChangedColumnAndDirection(newColumn, sortOrder.column, sortOrder.direction);
		setSortOrder(updatedSortOrder);
	}

	const veicoliConPolizze = Utils.getSortedList(list, sortOrder.column, sortOrder.direction);	
	
	if (!list) {
		return null;
	}
	
	
	return (
		
		<div>
			
			{/* -------------------------------------------------------------------------------------------------------------- */}
			
			Polizze Auto RCA
			
			<div className={styles.heading}>
				
				<button className={styles.heading_thumbnail} onClick={() => changeSortOrder(Utils.columns.TIPO)}>
					<div> {Utils.columns.TIPO} </div>
					{sortOrder.column === Utils.columns.TIPO && <SortArrow direction={sortOrder.direction} />}
				</button>
				
				<button className={styles.heading_first} onClick={() => changeSortOrder(Utils.columns.TARGA)}>
					<div> {Utils.columns.TARGA} </div>
					{sortOrder.column === Utils.columns.TARGA && <SortArrow direction={sortOrder.direction} />}
				</button>
				
				<button className={styles.heading_medium} onClick={() => changeSortOrder(Utils.columns.MARCA_MODELLO)}>
					<div> {Utils.columns.MARCA_MODELLO} </div>
					{sortOrder.column === Utils.columns.MARCA_MODELLO && <SortArrow direction={sortOrder.direction} />}
				</button>
				
				<button className={styles.heading_medium} onClick={() => changeSortOrder(Utils.columns.POLIZZA)}>
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


			{veicoliConPolizze.map((veicolo) => (
				<Link to={`/veicoli/${veicolo.id}`} key={veicolo.id}>
					<div className={`${styles.row}  ${Utils.isInScadenza(veicolo.polizze[0].scadenza) ? styles.row_red : styles.row_green}`}>
						<div className={styles.thumbnail}> <img src={Utils.getImageByTipo(veicolo.tipo)} alt="img" /> </div>
						<div className={styles.first}> {veicolo.targa} </div>
						<div className={styles.medium}> {Utils.getValueByColumn(veicolo, Utils.columns.MARCA_MODELLO)} </div>
						<div className={styles.medium}> {veicolo.polizze[0].polizza} </div>
						<div className={styles.medium}> {veicolo.polizze[0].compagnia} </div>
						<div className={styles.medium}> € {veicolo.polizze[0].premio} </div>
						<div className={styles.last}> <p className={Utils.isInScadenza(veicolo.polizze[0].scadenza) ? styles.red : styles.green}> {veicolo.polizze[0].scadenza} </p> </div>
					</div>
				</Link>
			))}
			
			<br></br> <br></br>
			{/* -------------------------------------------------------------------------------------------------------------- */}
			
			

		</div>
	);

};



export default ClienteDetailsPageTablePolizzeAuto;
