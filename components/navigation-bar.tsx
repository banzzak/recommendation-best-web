import styles from "./navigation-bar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import React from "react";
import type { NextPage } from "next";
import { useRouter } from 'next/router'

const NavigationBar: NextPage = () => {
  const router = useRouter();
  
  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    const searchQuery = event.currentTarget.searchQuery.value;
    if (searchQuery) {
      router.push(`/${searchQuery}`);
    }  
  }

  return (
    <div className={styles.icroundArrowBackIosParent}>
      <img
        className={styles.icroundArrowBackIosIcon}
        alt=""
        src="../icroundarrowbackios.svg"
      />
      <form className="search-form" onSubmit={onSearch}>
        <button type="submit" className={styles.transparentButton}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon}/>
        </button>
        <input type="text" placeholder="키워드를 검색해보세요." 
        id="searchQuery" name="search" className={styles.searchBar}/>
        <button type="submit" className={styles.searchButton}>       
          <img
            className={styles.icroundArrowBackIosIcon}
            alt=""
            src="../uilsearch.svg"
          />
        </button>
      </form>
    </div>
  );
};

export default NavigationBar;
