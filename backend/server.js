require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'Atif',
  password: process.env.DB_PASS || 'arpita',
  database: process.env.DB_NAME || 'class_routine_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

app.get('/api/sync', async (req, res) => {
  try {
    const teachers = await query('SELECT id,name,email,password,registeredAt FROM teachers');
    const students = await query('SELECT id,name,email,password,studentId,registeredAt FROM students');
    const classes = await query('SELECT id,course,courseName,semester,day,time,room,teacher,teacherEmail,status FROM classes');
    const notifications = await query('SELECT id,message,time,emailSent,forAll FROM notifications');

    res.json({ teachers, students, classes, notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

app.post('/api/register/teacher', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    const existing = await query('SELECT id FROM teachers WHERE email = ?', [email]);
    if (existing.length) return res.status(409).json({ message: 'This email is already registered' });

    const now = new Date();
    const result = await query('INSERT INTO teachers (name,email,password,registeredAt) VALUES (?,?,?,?)', [name, email, password, now]);
    const insertId = result.insertId || null;

    const [row] = await query('SELECT id,name,email,password,registeredAt FROM teachers WHERE id = ?', [insertId]);
    res.status(201).json(row || { id: insertId, name, email, password, registeredAt: now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

app.post('/api/register/student', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    const existing = await query('SELECT id FROM students WHERE email = ?', [email]);
    if (existing.length) return res.status(409).json({ message: 'This student ID is already registered' });

    const studentId = email.split('@')[0].toUpperCase();
    const now = new Date();
    const result = await query('INSERT INTO students (name,email,password,studentId,registeredAt) VALUES (?,?,?,?,?)', [name, email, password, studentId, now]);
    const insertId = result.insertId || null;

    const [row] = await query('SELECT id,name,email,password,studentId,registeredAt FROM students WHERE id = ?', [insertId]);
    res.status(201).json(row || { id: insertId, name, email, password, studentId, registeredAt: now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ message: 'Missing fields' });
  try {
    if (role === 'teacher') {
      const rows = await query('SELECT id,name,email,password,registeredAt FROM teachers WHERE email = ? AND password = ?', [email, password]);
      if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });
      return res.json(rows[0]);
    } else {
      const rows = await query('SELECT id,name,email,password,studentId,registeredAt FROM students WHERE email = ? AND password = ?', [email, password]);
      if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });
      return res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

// Classes endpoints
app.post('/api/classes', async (req, res) => {
  const { course, courseName, semester, day, time, room, teacher, teacherEmail, status } = req.body;
  try {
    const now = new Date();
    const result = await query('INSERT INTO classes (course,courseName,semester,day,time,room,teacher,teacherEmail,status) VALUES (?,?,?,?,?,?,?,?,?)', [course, courseName, semester, day, time, room, teacher, teacherEmail, status || 'scheduled']);
    const insertId = result.insertId || null;
    const [row] = await query('SELECT id,course,courseName,semester,day,time,room,teacher,teacherEmail,status FROM classes WHERE id = ?', [insertId]);
    res.status(201).json(row || { id: insertId, course, courseName, semester, day, time, room, teacher, teacherEmail, status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

app.put('/api/classes/:id', async (req, res) => {
  const id = req.params.id;
  const { course, courseName, semester, day, time, room, teacher, teacherEmail, status } = req.body;
  try {
    await query('UPDATE classes SET course=?,courseName=?,semester=?,day=?,time=?,room=?,teacher=?,teacherEmail=?,status=? WHERE id=?', [course, courseName, semester, day, time, room, teacher, teacherEmail, status, id]);
    const [row] = await query('SELECT id,course,courseName,semester,day,time,room,teacher,teacherEmail,status FROM classes WHERE id = ?', [id]);
    res.json(row || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

app.delete('/api/classes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await query('DELETE FROM classes WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

// Notifications endpoint
app.post('/api/notifications', async (req, res) => {
  const { message, emailSent = false, forAll = true } = req.body;
  try {
    const result = await query('INSERT INTO notifications (message,emailSent,forAll) VALUES (?,?,?)', [message, emailSent ? 1 : 0, forAll ? 1 : 0]);
    const insertId = result.insertId || null;
    const [row] = await query('SELECT id,message,time,emailSent,forAll FROM notifications WHERE id = ?', [insertId]);
    res.status(201).json(row || { id: insertId, message, time: new Date(), emailSent, forAll });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

const PORT = process.env.PORT || 3000;
// Start server immediately without seeding
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));

// Seed demo data if tables empty (non-blocking)
async function seedDefaults() {
  try {
    const tcount = await query('SELECT COUNT(*) as cnt FROM teachers');
    const scount = await query('SELECT COUNT(*) as cnt FROM students');
    const ccount = await query('SELECT COUNT(*) as cnt FROM classes');

    const tcnt = (tcount && tcount[0] && tcount[0].cnt) ? tcount[0].cnt : 0;
    const scnt = (scount && scount[0] && scount[0].cnt) ? scount[0].cnt : 0;
    const ccnt = (ccount && ccount[0] && ccount[0].cnt) ? ccount[0].cnt : 0;

    if (tcnt === 0) {
      const teachers = [
        { name: 'Dr. Md. Shahin Uddin', email: 'mdshahinuddin@mbstu.ac.bd', password: 'teacher123' },
          { name: 'Md. Anowar Kabir', email: 'anowarkabir@mbstu.ac.bd', password: 'teacher123' },
          { name: 'Dr. Nazrul Islam', email: 'nazrul@mbstu.ac.bd', password: 'teacher123' },
          { name: 'Dr. Mst. Nargis Akhter', email: 'nargis@mbstu.ac.bd', password: 'teacher123' },
          { name: 'Dr. Md. Badrul Alam Miah', email: 'badrul@mbstu.ac.bd', password: 'teacher123' },
          { name: 'Dr. Ziaur Rahman', email: 'zia@mbstu.ac.bd', password: 'teacher123' }
      ];
      for (const t of teachers) {
        await query('INSERT INTO teachers (name,email,password,registeredAt) VALUES (?,?,?,?)', [t.name, t.email, t.password, new Date()]);
      }
      console.log('Seeded teachers');
    }

    if (scnt === 0) {
      const students = [
        { name: 'MD.Atif Rahman Rudro', email: 'it22002@mbstu.ac.bd', password: 'student123' },
        { name: 'Ujjal Barai', email: 'it22009@mbstu.ac.bd', password: 'student123' },
        { name: 'Rajon Islam Noyon', email: 'it22015@mbstu.ac.bd', password: 'student123' }
      ];
      for (const s of students) {
        const studentId = s.email.split('@')[0].toUpperCase();
        await query('INSERT INTO students (name,email,password,studentId,registeredAt) VALUES (?,?,?,?,?)', [s.name, s.email, s.password, studentId, new Date()]);
      }
      console.log('Seeded students');
    }

    if (ccnt === 0) {
      // minimal class seed to match frontend demo
      const classes = [
        ['ICT-3207','Computer Organization & Architecture','6th','Saturday','09:00-09:50','R-206','Anowar Sir','anowarkabir@mbstu.ac.bd','scheduled'],
        ['ICT-3204','Web Application Development Lab','6th','Saturday','10:00-10:50','R-226A','Anowar Sir','anowarkabir@mbstu.ac.bd','scheduled'],
        ['ICT-3203','Web Application Development','6th','Saturday','11:00-11:50','R-226A','Anowar Sir','anowarkabir@mbstu.ac.bd','scheduled']
      ];
      for (const c of classes) {
        await query('INSERT INTO classes (course,courseName,semester,day,time,room,teacher,teacherEmail,status) VALUES (?,?,?,?,?,?,?,?,?)', c);
      }
      console.log('Seeded classes');
    }
  } catch (err) {
    console.warn('Seeding failed:', err.message || err);
  }
}

// Seed in the background without blocking
seedDefaults();
