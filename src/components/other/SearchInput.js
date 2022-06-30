// Libraries
import { SearchRounded } from "@mui/icons-material";

// Styles
import styles from "styles/other/SearchInput.module.css";

const SearchInput = ({ ...rest }) => {
    return (
        <div className={styles.wrapper}>
            <SearchRounded color="inherit" />
            <input className={styles.input} {...rest} />
        </div>
    );
};

export default SearchInput;
