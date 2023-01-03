import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import CSS, { Property } from 'csstype'

import styles from './what-is-project-r.module.css'

type WhatIsProjectRType = {
  /** Style props */
  buttonBackgroundColor?: Property.BackgroundColor
  buttonFontColor?: Property.Color
}

const WhatIsProjectR: NextPage<WhatIsProjectRType> = ({
  buttonBackgroundColor,
  buttonFontColor,
}) => {
  const router = useRouter()
  const handleClickAbout = () => {
    router.push('/about')
  }

  const buttonStyle: CSS.Properties = useMemo(() => {
    return {
      backgroundColor: buttonBackgroundColor,
      color: buttonFontColor,
    }
  }, [buttonBackgroundColor, buttonFontColor])

  return (
    <div className={styles.whatisprojectr}>
      <div className={styles.parent}>
        <div className={styles.div}>{`단 한 가지를 추천해드립니다. `}</div>
        <div className={styles.div1}>최고의 상품</div>
      </div>
      <button
        className={styles.button}
        style={buttonStyle}
        onClick={handleClickAbout}
      >
        <div className={styles.wrapper}>
          <div className={styles.div2}>프로젝트 R 소개</div>
        </div>
      </button>
    </div>
  )
}

export default WhatIsProjectR
