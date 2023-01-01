import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import type { NextPage } from "next";
import { useRouter } from "next/router";
import Footer from "../components/footer";
import WhatIsProjectR from "../components/what-is-project-r";
import {useRef} from "react";

const Home: NextPage = () => {
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

  return (
    <div className={styles.narrowScreen}>
    <div className={styles.home}>
      <img
        className={styles.untitledArtwork81}
        alt=""
        src="../untitled-artwork-8-1@2x.png"
      />
      <div className={styles.homeChild} />
      <div className={styles.footer}>
        <Footer />
        <WhatIsProjectR buttonBackgroundColor="black" buttonFontColor="white"/>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.frameWrapper}>
          <div className={styles.wrapper}>
            <div className={styles.div}>고민이 필요 없는 쇼핑</div>
          </div>
        </div>
        <img className={styles.groupChild} alt="" src="../frame-762.svg" />
        <div className={styles.groupItem} />
      </div>
      <div className={styles.header}>
        <div className={styles.headerChild} />
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
      </div>
      <div className={styles.r}>
        <img className={styles.rChild} alt="" src="../frame-7621.svg" />
      </div>
      <div className={styles.searchBarWrapper}>
        <form className="search-form" onSubmit={onSearch}>
          <button type="submit" className={styles.transparentButton}>
            <FontAwesomeIcon icon={faSearch} size="2x" className={styles.searchIcon}/>
          </button>
          <input type="text" placeholder="쇼핑 키워드를 검색해보세요." 
          id="searchQuery" ref={inputRef} className={styles.searchBar}/>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Home;
