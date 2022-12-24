import {MongoClient, Db, } from 'mongodb'

if (!process.env.MONGO_URI) {
  throw new Error('invalid/missing environment variable MONGODB_URI');
}
const MONGO_URI = process.env.MONGO_URI
const options = {}

const client: MongoClient = new MongoClient(MONGO_URI, options)
let clientPromise: Promise<MongoClient> = client.connect()

export default clientPromise;



