import styles from "./navigation-bar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import React, {useRef} from "react";
import type { NextPage } from "next";
import { useRouter } from 'next/router'

const NavigationBar: NextPage = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleClickBack = () => {
    router.push('/');
  }

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.blur();
    }

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
        onClick={handleClickBack}
      />
      <form className="search-form" onSubmit={onSearch}>
        <button type="submit" className={styles.transparentButton}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon}/>
        </button>
        <input type="text" placeholder="키워드를 검색해보세요." 
        id="searchQuery" ref={inputRef} className={styles.searchBar}/>
      </form>
    </div>
  );
};

export default NavigationBar;
