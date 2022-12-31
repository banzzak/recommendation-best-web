import type { NextPage } from "next";
import { useRouter } from 'next/router'
import styles from "../styles/AboutUs.module.css";

const AboutUs: NextPage = () => {
  const router = useRouter();

  function handleButtonClick() {
    router.push({
      pathname: '/',
    });
  }

  return (
    <div className={styles.aboutus}>
      <div className={styles.value}>VALUE</div>
      <div className={styles.aboutusInner}>
        <div className={styles.groupParent}>
          <div className={styles.phsmileyThinWrapper}>
            <div className={styles.phsmileyThin}>
              <div className={styles.phsmileyThinChild} />
              <img className={styles.vectorIcon} alt="" src="../vector.svg" />
            </div>
          </div>
          <div className={styles.r}>
            <p className={styles.p}>
              <span>{`시간은 적게 쓰면서도, `}</span>
            </p>
            <p className={styles.p}>
              <span>{`만족스런 상품을 구매하고 싶으시다면, `}</span>
            </p>
            <p className={styles.r1}>
              <span
                className={styles.r2}
              >{`지금 바로 R에서 검색하세요. `}</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.aboutusChild}>
        <div className={styles.frameWrapper}>
          <div className={styles.rWrapper}>
            <div className={styles.r3}>
              <span>
                <span className={styles.r4}>R</span>
                <span>{`은 사용자 반응, 판매량, 가심비 등의 요소를 분석하여 키워드별 `}</span>
              </span>
              <span className={styles.span}>최고의 상품 단 한 가지</span>
              <span>를 선정하여 추천합니다.</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rParent}>
        <div className={styles.r5}>
          <img className={styles.rChild} alt="" src="../frame-762.svg" />
        </div>
        <div className={styles.div}>이 추천드려요</div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.div}>{`이런 고민들을 위한 `}</div>
      </div>
      <div className={styles.container}>
        <div
          className={styles.div2}
        >{`생필품 사는데, 몇 시간 째 검색중... 선택장애 너무 힘들어요...ㅠㅠ `}</div>
      </div>
      <button className={styles.button}>
        <div className={styles.frame}>
          <div className={styles.div3} onClick={handleButtonClick}>
            추천 상품 검색하기
          </div>
        </div>
      </button>
      <div className={styles.frameDiv}>
        <div className={styles.div2}>
          광고, 가짜 후기들이 너무 판을 쳐요...ㅠㅠ
        </div>
      </div>
      <div className={styles.r6}>
        <img className={styles.rChild} alt="" src="../frame-762.svg" />
      </div>
      <div className={styles.wrapper1}>
        <div className={styles.div5}>
          끝 없는 굴레 같은 쇼핑...시간낭비 그만 할래요!
        </div>
      </div>
      <div className={styles.wrapper2}>
        <div className={styles.div2}>누가 나 대신 검색해서 알려줬으면 ...</div>
      </div>
      <button className={styles.button1} onClick={handleButtonClick}>
        <div className={styles.frame}>
          <div className={styles.div7}>지금 바로 추천 받기</div>
        </div>
      </button>
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
      <div className={styles.r7}>
        <img className={styles.rInner} alt="" src="../frame-7622.svg" />
      </div>
    </div>
  );
};

export default AboutUs;
