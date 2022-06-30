// React
import { React, useState } from "react";
import { Link } from "react-router-dom";

// Components
import SortArrow from "components/other/SortArrow";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/Table.module.css";


const ClienteTable = ({ list }) => {

	const [column, setColumn] = useState(undefined);
	const [direction, setDirection] = useState(undefined);

	function setColumnAndDirection(newColumn) {
		// if different column, change column and direction
		if (newColumn !== column) {
			setDirection(Utils.direction.INCR);
			setColumn(newColumn);
			return;
		}
		// if same column, change direction
		switch (direction) {
			case undefined:
				setDirection(Utils.direction.INCR);
				break;
			case Utils.direction.INCR:
				setDirection(Utils.direction.DECR);
				break;
			case Utils.direction.DECR:
				setDirection(undefined);
				break;
			default:
				break;
		}
	}

	const clienti = Utils.getSortedList(list, column, direction);

	if (!list) {
		return null;
	}
	
	return (
		
		<div>
			
			<div className={styles.heading}>

				<button className={styles.heading_thumbnail} onClick={() => setColumnAndDirection(Utils.Columns.TIPO)}>
					<div> {Utils.Columns.TIPO} </div>
					{column === Utils.Columns.TIPO && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_first} onClick={() => setColumnAndDirection(Utils.Columns.NOME_RAGSOCIALE)}>
					<div> {Utils.Columns.NOME_RAGSOCIALE} </div>
					{column === Utils.Columns.NOME_RAGSOCIALE && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_medium} onClick={() => setColumnAndDirection(Utils.Columns.POLIZZA)}>
					<div> {Utils.Columns.POLIZZA} </div>
					{column === Utils.Columns.POLIZZA && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_medium} onClick={() => setColumnAndDirection(Utils.Columns.COMPAGNIA)}>
					<div> {Utils.Columns.COMPAGNIA} </div>
					{column === Utils.Columns.COMPAGNIA && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_medium} onClick={() => setColumnAndDirection(Utils.Columns.PREMIO)}>
					<div> {Utils.Columns.PREMIO} </div>
					{column === Utils.Columns.PREMIO && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_last} onClick={() => setColumnAndDirection(Utils.Columns.SCADENZA)}>
					<div> {Utils.Columns.SCADENZA} </div>
					{column === Utils.Columns.SCADENZA && <SortArrow direction={direction} />}
				</button>

			</div>


			{clienti.map((cliente) => (
				<Link to={`/clienti/${cliente.id}`} key={cliente.id}>
					<div className={`${styles.row}  ${Utils.isInScadenza(cliente.scadenza) ? styles.row_red : styles.row_green}`}>

						<div className={styles.thumbnail}> <img src={Utils.getImageByTipo(cliente.tipo, 0)} alt="img" /> </div>
						<div className={styles.first}> {Utils.getValueByColumn(cliente, Utils.Columns.NOME_RAGSOCIALE)} </div>
						<div className={styles.medium}> {cliente.polizza} </div>
						<div className={styles.medium}> {cliente.compagnia} </div>
						<div className={styles.medium}> € {cliente.premio} </div>
						<div className={styles.last}> <p className={Utils.isInScadenza(cliente.scadenza) ? styles.red : styles.green}> {cliente.scadenza} </p>
						</div>

					</div>
				</Link>
			))}

		</div>
	);

};



export default ClienteTable;
