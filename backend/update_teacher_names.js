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

  const mappings = [
    {oldName: 'Nazrul Sir', newName: 'Dr. Nazrul Islam', email: 'nazrul@mbstu.ac.bd'},
    {oldName: "Nargis Ma'am", newName: 'Dr. Mst. Nargis Akhter', email: 'nargis@mbstu.ac.bd'},
    {oldName: 'Badrul Sir', newName: 'Dr. Md. Badrul Alam Miah', email: 'badrul@mbstu.ac.bd'},
    {oldName: 'Zia Sir', newName: 'Dr. Ziaur Rahman', email: 'zia@mbstu.ac.bd'},
    {oldName: 'Anowar Sir', newName: 'Md. Anowar Kabir', email: 'anowarkabir@mbstu.ac.bd'}
  ];

  try {
    for (const m of mappings) {
      const [r1] = await pool.execute("UPDATE classes SET teacher = ? WHERE teacher = ?", [m.newName, m.oldName]);
      console.log(`Updated classes: '${m.oldName}' -> '${m.newName}' => ${r1.affectedRows} rows`);

      const [r2] = await pool.execute("UPDATE teachers SET name = ? WHERE email = ? OR name = ?", [m.newName, m.email, m.oldName]);
      console.log(`Updated teachers: '${m.oldName}' -> '${m.newName}' (email=${m.email}) => ${r2.affectedRows} rows`);
    }

    const [teachers] = await pool.execute("SELECT id,name,email FROM teachers WHERE email IN ('nazrul@mbstu.ac.bd','nargis@mbstu.ac.bd','badrul@mbstu.ac.bd','zia@mbstu.ac.bd','anowarkabir@mbstu.ac.bd') OR name IN ('Dr. Nazrul Islam','Dr. Mst. Nargis Akhter','Dr. Md. Badrul Alam Miah','Dr. Ziaur Rahman','Md. Anowar Kabir')");
    const [classes] = await pool.execute("SELECT DISTINCT teacher, teacherEmail FROM classes WHERE teacher IN ('Dr. Nazrul Islam','Dr. Mst. Nargis Akhter','Dr. Md. Badrul Alam Miah','Dr. Ziaur Rahman','Md. Anowar Kabir')");

    console.log('\nResulting teachers:');
    console.log(JSON.stringify(teachers, null, 2));

    console.log('\nResulting classes (distinct teacher names):');
    console.log(JSON.stringify(classes, null, 2));
  } catch (err) {
    console.error('Error updating names:', err.message || err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

run();
