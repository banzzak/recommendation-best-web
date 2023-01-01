import styles from "./footer.module.css";

import type { NextPage } from "next";

const Footer: NextPage = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.recommendationbestallReservParent}>
        <div className={styles.recommendationbestallReserv}>
          @2022 Recommendation.Best.All Reserved.
        </div>
        <div className={styles.div}>
          <p className={styles.p}>{`쿠팡 파트너스 활동을 통해 `}</p>
          <p className={styles.p1}>일정액의 수수료를 제공 받을 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
