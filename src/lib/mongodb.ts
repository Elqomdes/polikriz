import { MongoClient, Db } from 'mongodb'

if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI not found, using fallback mode')
  // Fallback için mock data kullanılacak
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// MongoDB URI yoksa fallback mode
if (!uri) {
  // Fallback mode için mock client promise
  clientPromise = Promise.resolve(null as unknown as MongoClient)
} else if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  if (!client) {
    throw new Error('MongoDB not configured - using fallback mode')
  }
  return client.db('polikriz_platform')
}
