import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function clearDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI not found in .env.local");
    return;
  }

  const client = new MongoClient(uri);

  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    const db = client.db("wanderlust");

    console.log("🗑️ Clearing 'trips' collection...");
    await db.collection('trips').deleteMany({});
    console.log("✅ 'trips' cleared.");

    console.log("🗑️ Clearing 'blogs' collection...");
    await db.collection('blogs').deleteMany({});
    console.log("✅ 'blogs' cleared.");

    console.log("🚀 Database is now empty and ready for fresh content!");
  } catch (error) {
    console.error("❌ Failed to clear database:", error);
  } finally {
    await client.close();
  }
}

clearDatabase();
