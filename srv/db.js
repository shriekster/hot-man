const Database = require('better-sqlite3');
const path = require('path');
let db;
let error = null;
try {
  db = new Database(path.join(__dirname, 'db/data.db'));
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