const Database = require('better-sqlite3');
const path = require('path');
let db;

try {
  db = new Database(path.join(__dirname, 'db/data.db'));
} catch (e) {
  console.log(e)
} finally {
  console.log('Done.')
}

module.exports = db;