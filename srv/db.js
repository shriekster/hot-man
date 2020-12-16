/**
 * Creates SQLite database (if it does not exist)
 * and exports the database connection
 */
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

let db;
let error = null;
let dbPath = path.join(__dirname, 'db/data.db');
let sqlPath = path.join(__dirname, 'db/win-data.sql')

try {
  if (!fs.existsSync(dbPath)) {

    db = new Database(dbPath);

    const creation = fs.readFileSync(sqlPath, 'utf8');
    db.exec(creation);

  } else {
    // the database exists
    db = new Database(dbPath);
  }
} catch (e) {

  error = e;
  console.log(e);

} finally {

  if (!error){
    console.log('Connected to the database.')
  } else {
    console.log('Whoops!')
  }
}

module.exports = db;