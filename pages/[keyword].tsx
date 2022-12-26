import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { KeywordData } from '../lib/schema'
import { GetStaticPaths, GetStaticProps } from 'next'
import clientPromise from '../lib/mongo'
import { ParsedUrlQuery } from 'querystring'

const COUPANG_HOME_URL = "https://link.coupang.com/a/Jgahp"

export default function DetailPage({hasRecommendation, keyword, keywordData} : {
  hasRecommendation: boolean
  keyword: string
  keywordData: KeywordData
}) {
  const metaDescription = `베스트 ${keyword} 쇼핑 추천`
  let link = COUPANG_HOME_URL
  if (keywordData) {
    if (keywordData?.recommendedItem?.originalUrl) {
      link = keywordData?.recommendedItem?.originalUrl
    }
    if (keywordData?.recommendedItem?.affliateUrl) {
      link = keywordData?.recommendedItem?.affliateUrl
    }
  }
  const imgWidth = 300
  const imgHeight = 300
  
  return (
    <>
      <Head>
        <title> {keyword} 추천 </title>
        <meta name="description" content={metaDescription}/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <body>
        <main className={styles.main}>
          <div>
            <h2>
              {
                !hasRecommendation && 
                  "현재 해당 키워드에 대한 추천 아이템이 없습니다. 선정이 완료되는 대로 업데이트 하도록 하겠습니다. 감사합니다"
              }
            </h2>
          </div>
          <div>
            {
              keywordData && 
                <div>
                  <h1> R이 추천하는 {keyword}</h1>
                  <Link href={link}>
                    <div id="recommendedItem">
                      <Image 
                      src={keywordData.recommendedItem?.imageUrl} 
                      width={imgWidth}
                      height={imgHeight}
                      alt="recommended item image"
                      unoptimized/>
                      <h2>{keywordData.recommendedItem?.title}</h2>
                      <h3>
                        {keywordData.recommendedItem?.finalPrice} 원
                      </h3>
                      쇼핑하기
                    </div>
                  </Link>
                </div>
            }
          </div>
        </main>
        <div>
          <h6>
            이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
          </h6>
        </div>
      </body>
    </>
  )
}

type Props = {
  hasRecommendation: boolean,
  keyword: string,
  keywordData: KeywordData | null,  
}

interface Params extends ParsedUrlQuery {
  keyword: string,
}

export const getStaticPaths:GetStaticPaths<Params> = async () => { 
  const paths = await getPrerenderingKeywords()
  console.log("Pre-rendering keywords:")
  console.log(paths)
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps:GetStaticProps<Props, Params> = async (context) => {
  const keyword = context.params!.keyword
  const keywordData: KeywordData | null = await getKeywordData(keyword)
  
  if (!keywordData) {
    // direct to found no recommendation  page
    return {
      props: {
        hasRecommendation: false,
        keyword: keyword,
        keywordData: null,
      }
    }
  }
  return {
    props: {
      hasRecommendation: true,
      keyword: keyword,
      keywordData,
    }
  }
}

const getPrerenderingKeywords = async (): Promise<{
  params:{
    keyword: string
  }
}[]> => {
  const client = await clientPromise
  const db = client.db('recommendation-best')
  const collection = db.collection('keywords')

  const data = await collection.find({preRendering:true}).toArray()
  const preRenderingKeywordsPaths = data.map((item) => ({
    params: {
      keyword: item.keyword
    }
  }))
  return preRenderingKeywordsPaths
}

const getKeywordData = async (keyword: string): Promise<KeywordData | null> => {
  const client = await clientPromise
  const db = client.db('recommendation-best')
  const collection = db.collection('keywords')

  const data = await collection.findOne({keyword: keyword})
  if (!data) {
    return null
  }
  const preRendering = data.preRendering
  const recommendedItem = data.recommendedItem
  const searchedItems = data.searchedItems

  const keywordData:KeywordData = {
    keyword,
    preRendering,
    recommendedItem,
    searchedItems,
  }
  return keywordData
}