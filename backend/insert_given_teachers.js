require('dotenv').config();
const mysql = require('mysql2/promise');

async function run() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'Atif',
    password: process.env.DB_PASS || 'arpita',
    database: process.env.DB_NAME || 'class_routine_db',
    waitForConnections: true,
    connectionLimit: 5
  });

  const now = new Date();
  const teachers = [
    { email: 'nazrul@mbstu.ac.bd', password: 'teacher123', name: 'Nazrul Sir', registeredAt: now },
    { email: 'nargis@mbstu.ac.bd', password: 'teacher123', name: "Nargis Ma'am", registeredAt: now },
    { email: 'badrul@mbstu.ac.bd', password: 'teacher123', name: 'Badrul Sir', registeredAt: now },
    { email: 'zia@mbstu.ac.bd', password: 'teacher123', name: 'Zia Sir', registeredAt: now }
  ];

  try {
    for (const t of teachers) {
      const [res] = await pool.execute(
        `INSERT INTO teachers (name,email,password,registeredAt) VALUES (?,?,?,?)
         ON DUPLICATE KEY UPDATE name=VALUES(name), password=VALUES(password), registeredAt=VALUES(registeredAt)`,
        [t.name, t.email, t.password, t.registeredAt]
      );
      const action = res.affectedRows === 1 ? 'Inserted' : (res.affectedRows === 2 ? 'Updated' : 'NoChange');
      console.log(`${action}: ${t.name} <${t.email}>`);
    }

    const [rows] = await pool.execute(
      "SELECT id,name,email,password,registeredAt FROM teachers WHERE email IN (?,?,?,?)",
      teachers.map(t => t.email)
    );
    console.log('\nResulting rows:\n', JSON.stringify(rows, null, 2));
  } catch (err) {
    console.error('Error inserting teachers:', err.message || err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

run();
