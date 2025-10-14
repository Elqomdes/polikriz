import { MongoClient, type MongoClientOptions, type Collection, type Document } from "mongodb";

const defaultDbName = process.env.MONGODB_DB || "policrisis";

declare global {
  // Using var to augment global is the supported pattern in Next.js edge/server envs
  // See: https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#reusing-a-single-instance
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getMongoClient(): Promise<MongoClient> {
  if (!global._mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not set in environment.");
    }
    const options: MongoClientOptions = {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      minPoolSize: 0,
    };
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
}

export async function getDb(dbName = defaultDbName) {
  const client = await getMongoClient();
  return client.db(dbName);
}

export async function getCollection<T extends Document = Document>(name: string, dbName = defaultDbName): Promise<Collection<T>> {
  const db = await getDb(dbName);
  return db.collection<T>(name);
}


