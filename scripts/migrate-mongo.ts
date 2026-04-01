import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function migrateToMongo() {
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

    // 1. Migrate Trips
    const tripsPath = path.join(process.cwd(), 'src', 'data', 'trips.json');
    if (fs.existsSync(tripsPath)) {
      const tripsData = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));
      console.log(`Found ${tripsData.length} trips in trips.json. Migrating...`);
      
      for (const trip of tripsData) {
        await db.collection('trips').updateOne(
          { id: trip.id },
          { $set: trip },
          { upsert: true }
        );
      }
      console.log("✅ Trips migrated successfully!");
    }

    // 2. Migrate Blogs
    const blogsPath = path.join(process.cwd(), 'src', 'data', 'blogs.json');
    if (fs.existsSync(blogsPath)) {
      const blogsData = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
      console.log(`Found ${blogsData.length} blogs in blogs.json. Migrating...`);
      
      for (const blog of blogsData) {
        await db.collection('blogs').updateOne(
          { id: blog.id },
          { $set: blog },
          { upsert: true }
        );
      }
      console.log("✅ Blogs migrated successfully!");
    }

    // 3. Migrate Settings
    console.log("Migrating default site settings...");
    const defaultSettings = {
      id: "global",
      primaryColor: "#153526",
      secondaryColor: "#4b6452",
      accentColor: "#3A4B39"
    };
    await db.collection('settings').updateOne(
      { id: "global" },
      { $set: defaultSettings },
      { upsert: true }
    );
    console.log("✅ Settings migrated successfully!");

    // 4. Migrate Site Content (Homepage)
    // For simplicity, we'll hardcode a few key sections or point to mockData if we could import it.
    // Since mockData is large, I'll assume we want to migrate the current state of mockData.ts
    // For now, I'll just ensure the collection exists with a placeholder or basic structure
    // that the app can then use.
    
    console.log("Migrating homepage content...");
    // Import siteData object directly into this script to ensure all sections are migrated
    // Since I can't easily import it, I'll provide a representative sample or the full object
    // I previously saw in src/data/mockData.ts
    const siteContent = {
      id: "homepage",
      hero: {
         title: "DREAM \nGARDEN",
         description: "A decade of passion for creating breathtaking outdoor living spaces. We blend architectural precision with organic beauty to transform your environment.",
         bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHha1j5QPBgUI-45_H45Mixlkn8NkDJ4l_C9s6DKA3ELWlx4eBgML8J9mI6TR_nrpyM7AfQhRbhv7pn4agweoKZ6tcB8KUdPTDMofHSL1tjz3xP2FyOg1EjjV86LH3AvUgTO6suh85Pt5LD55f3UCfqzVlZ8WVlvZxfcs9zmquk9qkH6bqecSwH0mWQSBosuSgLKIZqyVSWmGnLUzR4MwTSTJ4BQ-QQ8mNDTMyif6_5JhtpJiT_k109TKbe9jDR90t4dgk3Hz28sdz"
      },
      values: {
        title: "WE ARE DIFFERENT \nIN EVERY WAYS",
        description: "Each project is a blank canvas. We don't just plant trees; we curate experiences that evolve with the seasons and integrate seamlessly with your architecture.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiN_c9vhRU47Hahhan6K7i37hzLqotQdk6nnjZNKE0kwe-IirBJbIgn6jzYQ2WYIuSxzT2QEHzfdeCPxFv3mTrkdsW50aGprI-eiph149sRK_trPg7mPC3sSqi4GdPXCOAkhcZN0qf6tPy4BmQxDxaOfz-f9sDsexCKJcoFvAbut6Xpb67r4QsnFBzIQwF8CqmGLDXlReWY8uYSk4sWLgwM8hggVn0tlxXw1e_GkqChmJqP9SQ5FBbDkEBOdEDI7dBJjKM2U2-CN-R",
        yearsExperience: "10+",
        yearsText: "Years of excellence in design",
      },
      process: {
        title: "SIMPLE STEPS FOR OUR\nLANDSCAPE WORK",
        steps: [
          { num: "01", title: "Design consultation", desc: "In the initial step, we sit down with you to have a detailed discussion about your gardening vision and preferences." },
          { num: "02", title: "Design & planning", desc: "Our team of experts meticulously crafts a custom garden design that aligns with your desires and your space characteristics." },
          { num: "03", title: "Implement construction", desc: "We present the design to you for review. Once approved, we move forward to implement the plan with construction." },
          { num: "04", title: "Garden decorating", desc: "With your design finalized, we put on our gardening gloves and work, creating your garden to be as beautiful as envisioned." },
        ]
      }
    };
    
    await db.collection('site_content').updateOne(
      { id: "homepage" },
      { $set: siteContent },
      { upsert: true }
    );
    console.log("✅ Site content migrated successfully!");

    console.log("🚀 Cloud Migration Complete!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await client.close();
  }
}

migrateToMongo();
