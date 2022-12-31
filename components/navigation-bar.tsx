import styles from "./navigation-bar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import React, {useRef, useEffect} from "react";
import type { NextPage } from "next";
import { useRouter } from 'next/router'

declare global {
  interface Window {
    scrollTo(options?: ScrollToOptions): void;
    scrollTo(x: number, y: number): void;
  }
}

const NavigationBar: NextPage = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);


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
        id="searchQuery" ref={inputRef} className={styles.searchBar}/>
      </form>
    </div>
  );
};

export default NavigationBar;
