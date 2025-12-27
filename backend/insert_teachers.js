require('dotenv').config();
const mysql = require('mysql2/promise');

const names = [
  'Dr. Mst. Nargis Akhter',
  'Dr. Ziaur Rahman',
  'Dr. Md. Abir Hossain',
  'Dr. Sajjad Waheed',
  'Dr. Monir Morshed',
  'Dr. Nazrul Islam',
  'Dr. Md. Badrul Alam Miah'
];

function makeEmail(name) {
  // remove common honorifics and non-letter chars, join words
  let s = name.replace(/\bDr\.?\b/ig, '')
              .replace(/\bMst\.?\b/ig, '')
              .replace(/\bMd\.?\b/ig, 'md')
              .replace(/[^a-zA-Z0-9\s]/g, '')
              .trim()
              .split(/\s+/)
              .join('')
              .toLowerCase();
  return `${s}@mbstu.ac.bd`;
}

async function run() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'Atif',
    password: process.env.DB_PASS || 'arpita',
    database: process.env.DB_NAME || 'class_routine_db',
    waitForConnections: true,
    connectionLimit: 5
  });

  try {
    for (const name of names) {
      const email = makeEmail(name);
      const password = 'teacher123';
      const [res] = await pool.execute(
        'INSERT IGNORE INTO teachers (name,email,password,registeredAt) VALUES (?,?,?,NOW())',
        [name, email, password]
      );
      if (res && res.affectedRows && res.affectedRows > 0) {
        console.log('Inserted:', name, email);
      } else {
        console.log('Skipped (exists):', name, email);
      }
    }
  } catch (err) {
    console.error('DB error:', err.message || err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

run();
