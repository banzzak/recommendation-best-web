import type { NextPage } from "next";
import styles from "./search-bar.module.css";

const SearchBar: NextPage = () => {
  return (
    <div className={styles.icroundArrowBackIosParent}>
      <img
        className={styles.icroundArrowBackIosIcon}
        alt=""
        src="../icroundarrowbackios.svg"
      />
      <img
        className={styles.icroundArrowBackIosIcon}
        alt=""
        src="../uilsearch.svg"
      />
    </div>
  );
};

export default SearchBar;
