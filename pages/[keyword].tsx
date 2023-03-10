import styles from '../styles/DetailPage.module.css'

import { GetStaticPaths, GetStaticProps } from 'next'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { ParsedUrlQuery } from 'querystring'
import NavigationBar from '../components/navigation-bar'

import { KeywordData, Item } from '../lib/schema'
import clientPromise from '../lib/mongo'
import WhatIsProjectR from '../components/what-is-project-r'

const COUPANG_HOME_URL = 'https://link.coupang.com/a/Jgahp'

declare global {
  interface Window {
    scrollTo(options?: ScrollToOptions): void
    scrollTo(x: number, y: number): void
  }
}

declare var document: Document

const DetailPage: NextPage<Props> = ({
  hasSearchResult,
  keyword,
  recommendedKeywordData,
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && document) {
      ;(document.querySelector(
        'meta[name=viewport]',
      ) as HTMLMetaElement).setAttribute(
        'content',
        'width=device-width, initial-scale=1.0',
      )
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }, [hasSearchResult, keyword, recommendedKeywordData])

  const buttonBackgroundColor = 'transparent'
  const buttonFontColor = 'grey'
  const title = `베스트 ${keyword} 추천`
  const metaDescription = `베스트 ${keyword} 쇼핑 추천 상품`
  let link = COUPANG_HOME_URL
  if (recommendedKeywordData) {
    if (recommendedKeywordData?.recommendedItem?.originalUrl) {
      link = recommendedKeywordData?.recommendedItem?.originalUrl
    }
    if (recommendedKeywordData?.recommendedItem?.affiliateUrl) {
      link = recommendedKeywordData?.recommendedItem?.affiliateUrl
    }
  }
  // TODO: 쿠팡에서 검색하기 Url Link 만들기
  const imgWidth = 300
  const imgHeight = 300

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <body>
        <main className={styles.main}>
          <div className={styles.narrowScreen}>
            <div className={styles.movetonextjs}>
              <div className={styles.searchresult}>
                <div
                  id="noKeywordDiv"
                  className={styles.nokeyword}
                  style={{ display: !hasSearchResult ? 'block' : 'none' }}
                >
                  <div className={styles.nokeywordInner}>
                    <div className={styles.pixelarticonsmoodSadParent}>
                      <img
                        className={styles.pixelarticonsmoodSad}
                        alt=""
                        src="../pixelarticonsmoodsad.svg"
                      />
                      <div className={styles.wrapper}>
                        <div className={styles.noKeywordDescription}>
                          현재 해당 키워드에 대한 추천 아이템이 없습니다. 선정이
                          완료되는 대로 업데이트하겠습니다. 감사합니다.
                        </div>
                      </div>
                    </div>
                  </div>
                  {recommendedKeywordData && (
                    <div className={styles.rectangleParent}>
                      <div className={styles.frameChild} />
                      <div className={styles.div1}>이건 어때요?</div>
                    </div>
                  )}
                </div>
                {recommendedKeywordData && (
                  <div className={styles.s1}>
                    <div className={styles.rParent}>
                      <div className={styles.r}>
                        <img
                          className={styles.rChild}
                          alt=""
                          src="../frame-762.svg"
                        />
                      </div>
                      <div className={styles.div2}>
                        이 추천하는 &quot;{keyword}&quot;
                      </div>
                    </div>
                    <Link href={link}>
                      <div className={styles.productCard}>
                        <div className={styles.maskGroupParent}>
                          <img
                            className={styles.maskGroupIcon}
                            alt="recommended item image"
                            src={
                              recommendedKeywordData.recommendedItem?.imageUrl
                            }
                          />
                          <div className={styles.frameWrapper}>
                            <div className={styles.frameParent}>
                              <div className={styles.parent}>
                                <div className={styles.div3}>
                                  {
                                    recommendedKeywordData.recommendedItem
                                      ?.title
                                  }
                                </div>
                                <div className={styles.div4}>
                                  {
                                    recommendedKeywordData.recommendedItem
                                      ?.finalPrice
                                  }{' '}
                                  원
                                </div>
                              </div>
                              <button className={styles.button}>
                                <div className={styles.container}>
                                  <div className={styles.div5}>제품 확인</div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
                <div className={styles.footer}>
                  <div className={styles.footerInner}>
                    <div className={styles.recommendationbestallReservParent}>
                      <div className={styles.recommendationbestallReserv}>
                        @2022 Recommendation.Best.All Reserved.
                      </div>
                      <div className={styles.div6}>
                        <p
                          className={styles.p}
                        >{`쿠팡 파트너스 활동을 통해 `}</p>
                        <p className={styles.p1}>
                          일정액의 수수료를 제공 받을 수 있습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                  <WhatIsProjectR
                    buttonBackgroundColor={buttonBackgroundColor}
                    buttonFontColor={buttonFontColor}
                  />
                </div>
              </div>
              <div className={styles.header}>
                <div className={styles.headerChild} />
                <NavigationBar />
              </div>
            </div>
          </div>
        </main>
      </body>
    </>
  )
}

type Props = {
  hasSearchResult: boolean
  keyword: string
  recommendedKeywordData: KeywordData | null
}

interface Params extends ParsedUrlQuery {
  keyword: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  if (
    !process.env.PRERENDERING_ENABLED ||
    process.env.PRERENDERING_ENABLED.toLowerCase() === 'false'
  ) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
  const paths = await getPrerenderingKeywords()
  paths.push({ params: { keyword: 'NoSearchResult' } })
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context,
) => {
  const keyword = context.params!.keyword
  const keywordData: KeywordData | null = await getKeywordData(keyword)

  if (!keywordData) {
    // direct to found no recommendation  page
    return {
      props: {
        hasSearchResult: false,
        keyword: keyword,
        recommendedKeywordData: null,
      },
    }
  }
  return {
    props: {
      hasSearchResult: true,
      keyword: keyword,
      recommendedKeywordData: keywordData,
    },
  }
}

const getPrerenderingKeywords = async (): Promise<
  {
    params: {
      keyword: string
    }
  }[]
> => {
  const client = await clientPromise
  const db = client.db('recommendation-best')
  const collection = db.collection('keywords')

  const data = await collection.find({ preRendering: true }).toArray()
  const preRenderingKeywordsPaths = data.map((item) => ({
    params: {
      keyword: item.keyword,
    },
  }))
  return preRenderingKeywordsPaths
}

const getKeywordData = async (keyword: string): Promise<KeywordData | null> => {
  const client = await clientPromise
  const db = client.db('recommendation-best')
  const collection = db.collection('keywords')

  const data = await collection.findOne({ keyword: keyword })
  if (!data) {
    return null
  }
  const preRendering = data.preRendering
  const recommendedItemRaw = data.recommendedItems.pop()
  const recommendedItem: Item = {
    title: recommendedItemRaw['title'],
    finalPrice: recommendedItemRaw['finalPrice'],
    basePrice: recommendedItemRaw['basePrice'],
    imageUrl: recommendedItemRaw['imageUrl'],
    originalUrl: recommendedItemRaw['originalUrl'],
    affiliateUrl: recommendedItemRaw['affiliateUrl'],
  }
  const keywordData: KeywordData = {
    keyword,
    preRendering,
    recommendedItem,
  }
  return keywordData
}

export default DetailPage
