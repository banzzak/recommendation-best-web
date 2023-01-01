import type { NextPage } from "next";
import Footer from "../components/footer";
import WhatIsProjectR from "../components/what-is-project-r";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
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
        <input
          className={styles.searchBar}
          type="text"
          placeholder="쇼핑 키워드를 검색해보세요"
        />
      </div>
    </div>
    </div>
  );
};

export default Home;
