// Libraries
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@mui/icons-material";
import Utils from "components/utils/Utils";

// Styles
import styles from "styles/Table.module.css";

const SortArrow = ({ direction }) => {
    
    if (!direction) {
        return <></>;
    }
    
    if (direction === Utils.direction.INCR) {
        return (
            <div className={styles.sort_arrow}>
                <KeyboardArrowUpRounded color="inherit" />
            </div>
        );
    }
    
    if (direction === Utils.direction.DECR) {
        return (
            <div className={styles.sort_arrow}>
                <KeyboardArrowDownRounded color="inherit" />
            </div>
        );
    }
    
};

export default SortArrow;
