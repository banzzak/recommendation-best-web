import type { NextPage } from "next";
import styles from "./navigation-bar.module.css";
import SearchBar from "./search-bar";

const NavigationBar: NextPage = () => {
  return (
    <div className={styles.icroundArrowBackIosParent}>
      <img
        className={styles.icroundArrowBackIosIcon}
        alt=""
        src="../icroundarrowbackios.svg"
      />
      <SearchBar/>
      <img
        className={styles.icroundArrowBackIosIcon}
        alt=""
        src="../uilsearch.svg"
      />
    </div>
  );
};

export default NavigationBar;
