// React
import { React, useState } from "react";
import { Link } from "react-router-dom";

// Components
import SortArrow from "components/other/SortArrow";

// Libraries
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/Table.module.css";




const PolizzaTable = ({ list }) => {

	const [column, setColumn] = useState(undefined);
	const [direction, setDirection] = useState(undefined);
	
	// Da portare in Utils con tutti parametri
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

	const polizze = Utils.getSortedList(list, column, direction);
	// const polizzeVita = polizze.filter(polizza => polizza.tipo === Utils.tipo.POLIZZA_VITA);
	// const polizzeVita = polizze.map(polizza => ({ ...polizza }));
	const polizzeVita = polizze.map(polizza => ({ ...polizza, tipo: Utils.tipo.POLIZZA_VITA }));
	const polizzePrevidenza = polizze.map(polizza => ({ ...polizza, tipo: Utils.tipo.POLIZZA_VITA }));
	

	if (!list) {
		return null;
	}
	
	
	return (
		
		<div>
			
			{/* -------------------------------------------------------------------------------------------------------------- */}
			
			Polizze RCA
			
			<div className={styles.heading}>
				
				<button className={styles.heading_thumbnail} onClick={() => setColumnAndDirection(Utils.Columns.TIPO)}>
					<div> {Utils.Columns.TIPO} </div>
					{column === Utils.Columns.TIPO && <SortArrow direction={direction} />}
				</button>
				
				<button className={styles.heading_first} onClick={() => setColumnAndDirection(Utils.Columns.POLIZZA)}>
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


			{polizze.map((polizza) => (
				<Link to={`/clienti/${polizza.id}`} key={polizza.id}>
					<div className={`${styles.row}  ${Utils.isInScadenza(polizza.scadenza) ? styles.row_red : styles.row_green}`}>
						
						<div className={styles.thumbnail}> <img src={Utils.getImageByTipo(polizza.tipo, 0)} alt="img" /> </div>
						<div className={styles.first}> {polizza.polizza} </div>
						<div className={styles.medium}> {polizza.compagnia} </div>
						<div className={styles.medium}> € {polizza.premio} </div>
						<div className={styles.last}> <p className={Utils.isInScadenza(polizza.scadenza) ? styles.red : styles.green}> {polizza.scadenza} </p>
						</div>

					</div>
				</Link>
			))}
			
			{/* -------------------------------------------------------------------------------------------------------------- */}
			<br></br> <br></br>
			Polizze Vita
			
			<div className={styles.heading}>
				
				{/* tipo */}
				<button className={styles.heading_first} onClick={() => setColumnAndDirection(Utils.Columns.POLIZZA)}>
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


			{polizzeVita.map((polizza) => (
				<Link to={`/clienti/${polizza.id}`} key={polizza.id}>
					<div className={`${styles.row}  ${Utils.isInScadenza(polizza.scadenza) ? styles.row_red : styles.row_green}`}>
						
						{/* tipo */}
						<div className={styles.first}> {polizza.polizza} </div>
						<div className={styles.medium}> {polizza.compagnia} </div>
						<div className={styles.medium}> € {polizza.premio} </div>
						<div className={styles.last}> <p className={Utils.isInScadenza(polizza.scadenza) ? styles.red : styles.green}> {polizza.scadenza} </p>
						</div>

					</div>
				</Link>
			))}
			
			{/* -------------------------------------------------------------------------------------------------------------- */}
			<br></br> <br></br>
			Polizze Previdenza
			
			<div className={styles.heading}>
				
				{/* tipo */}
				<button className={styles.heading_first} onClick={() => setColumnAndDirection(Utils.Columns.POLIZZA)}>
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


			{polizzePrevidenza.map((polizza) => (
				<Link to={`/clienti/${polizza.id}`} key={polizza.id}>
					<div className={`${styles.row}  ${Utils.isInScadenza(polizza.scadenza) ? styles.row_red : styles.row_green}`}>
						
						{/* tipo */}
						<div className={styles.first}> {polizza.polizza} </div>
						<div className={styles.medium}> {polizza.compagnia} </div>
						<div className={styles.medium}> € {polizza.premio} </div>
						<div className={styles.last}> <p className={Utils.isInScadenza(polizza.scadenza) ? styles.red : styles.green}> {polizza.scadenza} </p>
						</div>

					</div>
				</Link>
			))}
			
			{/* -------------------------------------------------------------------------------------------------------------- */}
			

		</div>
	);

};



export default PolizzaTable;
