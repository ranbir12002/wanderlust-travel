import { db } from '../src/lib/db';
import fs from 'fs';
import path from 'path';

function migrate() {
  console.log("Starting SQLite migration...");

  try {
    // Migrate Trips
    const tripsPath = path.join(process.cwd(), 'src', 'data', 'trips.json');
    if (fs.existsSync(tripsPath)) {
      const tripsData = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));
      
      const insertTrip = db.prepare(`
        INSERT OR REPLACE INTO trips (id, slug, title, badge, duration, price, thumbnail, heroImage, natureOfTrip, lodgingType, subtitle, itinerary)
        VALUES (@id, @slug, @title, @badge, @duration, @price, @thumbnail, @heroImage, @natureOfTrip, @lodgingType, @subtitle, @itinerary)
      `);

      let tCount = 0;
      for (const trip of tripsData) {
        insertTrip.run({
          ...trip,
          badge: trip.badge || null,
          itinerary: JSON.stringify(trip.itinerary)
        });
        tCount++;
      }
      console.log(`Migrated ${tCount} trips successfully!`);
    } else {
      console.log("trips.json not found, skipping...");
    }

    // Migrate Blogs
    const blogsPath = path.join(process.cwd(), 'src', 'data', 'blogs.json');
    if (fs.existsSync(blogsPath)) {
      const blogsData = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
      
      const insertBlog = db.prepare(`
        INSERT OR REPLACE INTO blogs (id, slug, title, date, thumbnail, heroImage, author, category, content)
        VALUES (@id, @slug, @title, @date, @thumbnail, @heroImage, @author, @category, @content)
      `);

      let bCount = 0;
      for (const blog of blogsData) {
        insertBlog.run({
          ...blog,
          content: JSON.stringify(blog.content)
        });
        bCount++;
      }
      console.log(`Migrated ${bCount} blogs successfully!`);
    } else {
      console.log("blogs.json not found, skipping...");
    }

    console.log("Migration Complete!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrate();
