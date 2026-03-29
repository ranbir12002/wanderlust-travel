const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(process.cwd(), 'travel.db'));

// Ensure column exists
try {
  db.prepare('SELECT routeWaypoints FROM trips LIMIT 1').get();
} catch (e) {
  db.exec("ALTER TABLE trips ADD COLUMN routeWaypoints TEXT DEFAULT '[]'");
}

const lehWaypoints = JSON.stringify([
  'Manali', 'Rohtang La', 'Keyelong', 'Baralacha La Pass',
  'Sarchu', 'Taglang La', 'Leh', 'Khardung La',
  'Nubra Valley', 'Pangong Tso'
]);

const spitiWaypoints = JSON.stringify([
  'Shimla', 'Sarahan', 'Sangla', 'Kalpa',
  'Nako', 'Tabo', 'Dhankar', 'Kaza',
  'Kibber', 'Chicham'
]);

db.prepare('UPDATE trips SET routeWaypoints = ? WHERE slug = ?').run(lehWaypoints, 'leh-ladakh');
db.prepare('UPDATE trips SET routeWaypoints = ? WHERE slug = ?').run(spitiWaypoints, 'spiti-valley');

console.log('Done! Seeded routeWaypoints for leh-ladakh and spiti-valley');
