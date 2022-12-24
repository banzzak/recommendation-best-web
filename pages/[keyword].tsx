import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { KeywordData } from '../lib/schema'
import { GetStaticPaths, GetStaticProps } from 'next'
import clientPromise from '../lib/mongo'

export default function DetailPage({hasRecommendation, keyword, keywordData} : {
  hasRecommendation: boolean
  keyword: string
  keywordData: KeywordData
}) {
  return (
    <>
      <Head>
        <title>Detail Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing
          </p>
        </div>
      </main>
    </>
  )
}

export const getStaticPaths:GetStaticPaths = async () => { 
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps:GetStaticProps = async ({params}: {
  params: {
    keyword: string
  }
}) => {
  const keyword = params.keyword
  const keywordData: KeywordData | null = await getKeywordData(keyword)
  
  console.log('keywordData :')
  console.log(keywordData)

  if (!keywordData) {
    // direct to found no recommendation  page
    return {
      hasRecommendation: false,
      keyword: keyword,
      keywordData: null,
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

const getKeywordData = async (keyword: string): Promise<KeywordData | null> => {
  console.log("keyword:")
  console.log(keyword)
  const client = await clientPromise
  const db = client.db('recommendation-best')
  const collection = db.collection('keywords')

  const data = await collection.findOne({keyword: keyword})
  console.log('data :')
  console.log(data)
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