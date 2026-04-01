import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

// If the URI is missing, we don't crash instantly so the user can build the app,
// but any interaction with the DB will throw an explicit error.
let clientPromise: Promise<MongoClient>;

if (!uri) {
  console.warn('⚠️ MONGODB_URI is not defined in .env.local');
  // Return a rejected promise so any await getDb() throws an error correctly
  clientPromise = Promise.reject(new Error('MONGODB_URI missing from environment variables. Please configure the database string.'));
} else {
  const options = {
    tls: true,
    tlsAllowInvalidCertificates: true, // Workaround for SSL Alert 80 on some Windows environments
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  };
  let client: MongoClient;

  if (process.env.NODE_ENV === 'development') {
    // Development caching to prevent hot-reload connection flooding
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // Production connection
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;

export async function getDb(dbName = "wanderlust") {
  const client = await clientPromise;
  return client.db(dbName);
}
