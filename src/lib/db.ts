import Database from 'better-sqlite3';
import path from 'path';

// Define the absolute path to the database file in the root directory
const dbPath = path.join(process.cwd(), 'travel.db');

// Initialize the database connection (only in server environments)
let db: Database.Database;

if (typeof window === "undefined") {
  db = new Database(dbPath, { verbose: console.log });
  
  // Enforce foreign keys and initialize tables
  db.pragma('journal_mode = WAL'); // Better concurrent performance

  db.exec(`
    CREATE TABLE IF NOT EXISTS trips (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      badge TEXT,
      duration TEXT NOT NULL,
      price TEXT NOT NULL,
      thumbnail TEXT NOT NULL,
      heroImage TEXT NOT NULL,
      natureOfTrip TEXT NOT NULL,
      lodgingType TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      itinerary TEXT NOT NULL -- stored as JSON string
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      thumbnail TEXT NOT NULL,
      heroImage TEXT NOT NULL,
      author TEXT NOT NULL,
      category TEXT NOT NULL,
      content TEXT NOT NULL -- stored as JSON string
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Simple migration to add tags if not exists
  try {
    db.prepare('SELECT tags FROM trips LIMIT 1').get();
  } catch (e) {
    console.log("Adding tags column to trips table...");
    db.exec('ALTER TABLE trips ADD COLUMN tags TEXT DEFAULT "[]"');
  }

  // Migration to add routeWaypoints if not exists
  try {
    db.prepare('SELECT routeWaypoints FROM trips LIMIT 1').get();
  } catch (e) {
    console.log("Adding routeWaypoints column to trips table...");
    db.exec('ALTER TABLE trips ADD COLUMN routeWaypoints TEXT DEFAULT "[]"');
  }
}

export { db };
