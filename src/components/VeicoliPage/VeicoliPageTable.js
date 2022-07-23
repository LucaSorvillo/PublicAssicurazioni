// React
import { React, useState } from "react";
import { Link } from "react-router-dom";

// Components
import SortArrow from "components/other/SortArrow";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/Table.module.css";


const VeicoliPageTable = ({ list }) => {
	
	const [sortOrder, setSortOrder] = useState({column: undefined, direction: undefined});

	function changeSortOrder(newColumn) {
		// Utils.getChangedColumnAndDirection(newColumn, prevColumn, prevDirection)
		const updatedSortOrder = Utils.getChangedColumnAndDirection(newColumn, sortOrder.column, sortOrder.direction);
		setSortOrder(updatedSortOrder);
	}
	
	// Utils.getSortedList(list, column, direction)
	const veicoli = Utils.getSortedList(list, sortOrder.column, sortOrder.direction);

	if (!list) {
		return null;
	}

	return (

		<div>
			
			{/* Heading */}
			<div className={styles.heading}>
				{/* Column */}
				<button className={styles.heading_thumbnail} onClick={() => 
                    changeSortOrder(Utils.columns.TIPO)}>
					<div> {Utils.columns.TIPO} </div>
					{sortOrder.column === Utils.columns.TIPO && 
                    <SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column */}
				{/* <button className={styles.heading_first} onClick={() =>  */}
				<button className={styles.heading_medium} onClick={() => 
                    changeSortOrder(Utils.columns.TARGA)}>
					<div> {Utils.columns.TARGA} </div>
					{sortOrder.column === Utils.columns.TARGA && 
                    <SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column */}
				<button className={styles.heading_medium} onClick={() => 
                    changeSortOrder(Utils.columns.MARCA)}>
					<div> {Utils.columns.MARCA} </div>
					{sortOrder.column === Utils.columns.MARCA && 
                    <SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column */}
				<button className={styles.heading_medium} onClick={() => 
                    changeSortOrder(Utils.columns.MODELLO)}>
					<div> {Utils.columns.MODELLO} </div>
					{sortOrder.column === Utils.columns.MODELLO && 
                    <SortArrow direction={sortOrder.direction} />}
				</button>
				{/* Column */}
				{/* <button className={styles.heading_last} onClick={() => 
                    changeSortOrder(Utils.columns.TEL)}>
					<div> {Utils.columns.TEL} </div>
					{sortOrder.column === Utils.columns.TEL && 
                    <SortArrow direction={sortOrder.direction} />}
				</button> */}
			</div>

			{/* Rows */}
			{veicoli.map((veicolo) => (
				<Link to={`/veicoli/${veicolo.id}`} key={veicolo.id}>
					{/* white row */}
					<div className={styles.row}>
						<div className={styles.thumbnail}> <img src={Utils.getImageByTipo(veicolo.tipo)} alt="img" /> </div>
						{/* <div className={styles.first}> {veicolo.targa} </div> */}
						<div className={styles.medium}> {veicolo.targa} </div>
						<div className={styles.medium}> {veicolo.marca} </div>
						<div className={styles.medium}> {veicolo.modello} </div>
						{/* <div className={styles.last}> <p> {cliente.tel} </p> </div> */}
					</div>
				</Link>
			))}

		</div>
		
	);

};


export default VeicoliPageTable;
