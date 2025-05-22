const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'gsis',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Get all doctors (with optional filtering)
app.get('/api/doctors', (req, res) => {
  const { hospital, city, region } = req.query;
  let sql = 'SELECT doctorID, name, hospital, city, region FROM doctors';
  const params = [];
  const conditions = [];

  if (hospital) {
    conditions.push('hospital = ?');
    params.push(hospital);
  }
  if (city) {
    conditions.push('city = ?');
    params.push(city);
  }
  if (region) {
    conditions.push('region = ?');
    params.push(region);
  }
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// Get all appointments
app.get('/api/appointments', (req, res) => {
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// Update appointment status and decline reason
app.put('/api/appointments/:appointID', (req, res) => {
  const { status, declineReason } = req.body;
  const { appointID } = req.params;
  db.query(
    'UPDATE appointments SET status = ?, declineReason = ? WHERE appointID = ?',
    [status, declineReason || '', appointID],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ success: true });
    }
  );
});

// Add a doctor
app.post('/api/doctors', (req, res) => {
  const { name, hospital, city, region } = req.body;
  if (!name || !hospital || !city || !region) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  db.query(
    'INSERT INTO doctors (name, hospital, city, region) VALUES (?, ?, ?, ?)',
    [name, hospital, city, region],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({
        doctorID: result.insertId,
        name,
        hospital,
        city,
        region
      });
    }
  );
});

// Add a hospital
app.post('/api/hospitals', (req, res) => {
  const { hospName, city, region } = req.body;
  db.query(
    'INSERT INTO hospitals (hospName, city, region) VALUES (?, ?, ?)',
    [hospName, city, region],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ hospitalID: result.insertId, hospName, city, region });
    }
  );
});

// Add an appointment
app.post('/api/appointments', (req, res) => {
  const { fName, pNum, bPNum, date, time, reason, region, city, hospital, doctor, email } = req.body;
  db.query(
    'INSERT INTO appointments (fName, pNum, bPNum, date, time, reason, region, city, hospital, doctor, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [fName, pNum, bPNum, date, time, reason, region, city, hospital, doctor, email],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, fName, pNum, bPNum, date, time, reason, region, city, hospital, doctor, email });
    }
  );
});

// Delete a hospital
app.delete('/api/hospitals/:hospitalID', (req, res) => {
  const { hospitalID } = req.params;
  db.query('DELETE FROM hospitals WHERE hospitalID = ?', [hospitalID], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true });
  });
});

// Delete a doctor
app.delete('/api/doctors/:doctorID', (req, res) => {
  const { doctorID } = req.params;
  db.query('DELETE FROM doctors WHERE doctorID = ?', [doctorID], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true });
  });
});

// Delete an appointment (uses appointID)
app.delete('/api/appointments/:appointID', (req, res) => {
  const { appointID } = req.params;
  db.query('DELETE FROM appointments WHERE appointID = ?', [appointID], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true });
  });
});

// Get all regions
app.get('/api/regions', (req, res) => {
  db.query('SELECT DISTINCT region FROM hospitals', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results.map(r => r.region));
  });
});

// Get all cities for a region
app.get('/api/cities', (req, res) => {
  const { region } = req.query;
  if (!region) return res.status(400).json({ error: 'Region is required' });
  db.query(
    'SELECT DISTINCT city FROM hospitals WHERE LOWER(region) = LOWER(?)',
    [region],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results.map(r => r.city));
    }
  );
});

// Get all hospitals or by city
app.get('/api/hospitals', (req, res) => {
  const { city, region } = req.query;
  let sql = 'SELECT * FROM hospitals';
  const params = [];
  const conditions = [];

  if (city) {
    conditions.push('city = ?');
    params.push(city);
  }
  if (region) {
    conditions.push('LOWER(region) = LOWER(?)');
    params.push(region);
  }
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// Count all appointments
app.get('/api/count/appointments', (req, res) => {
  db.query(
    "SELECT COUNT(*) AS count FROM appointments WHERE status IS NULL OR status = '' OR status = 'Pending'",
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ count: results[0].count });
    }
  );
});

// Count all doctors
app.get('/api/count/doctors', (req, res) => {
  db.query('SELECT COUNT(*) AS count FROM doctors', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ count: results[0].count });
  });
});

// Count all hospitals
app.get('/api/count/hospitals', (req, res) => {
  db.query('SELECT COUNT(*) AS count FROM hospitals', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ count: results[0].count });
  });
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { userName, password } = req.body;
  db.query(
    'SELECT * FROM admins WHERE userName = ? AND password = ?',
    [userName, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.json({ success: true, adminID: results[0].adminID, userName: results[0].userName });
    }
  );
});

// Get hospitals that have at least one doctor
app.get('/api/hospitals/with-doctors', (req, res) => {
  const { city, region } = req.query;
  let sql = `
    SELECT h.* FROM hospitals h
    WHERE EXISTS (
      SELECT 1 FROM doctors d
      WHERE d.hospital = h.hospName
  `;
  const params = [];
  if (city) {
    sql += ' AND h.city = ?';
    params.push(city);
  }
  if (region) {
    sql += ' AND LOWER(h.region) = LOWER(?)';
    params.push(region);
  }
  sql += ' )';
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// Get doctors that are assigned to a hospital that exists
app.get('/api/doctors/with-hospital', (req, res) => {
  const { region } = req.query;
  let sql = `
    SELECT d.* FROM doctors d
    WHERE d.hospital IS NOT NULL AND d.hospital != ''
      AND EXISTS (
        SELECT 1 FROM hospitals h
        WHERE h.hospName = d.hospital
  `;
  const params = [];
  if (region) {
    sql += ' AND LOWER(h.region) = LOWER(?)';
    params.push(region);
  }
  sql += ' )';
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// Hospitals WITHOUT doctors
app.get('/api/hospitals/without-doctors', (req, res) => {
  const { city, region } = req.query;
  let sql = `
    SELECT h.* FROM hospitals h
    WHERE NOT EXISTS (
      SELECT 1 FROM doctors d
      WHERE d.hospital = h.hospName
  `;
  const params = [];
  if (city) {
    sql += ' AND h.city = ?';
    params.push(city);
  }
  if (region) {
    sql += ' AND LOWER(h.region) = LOWER(?)';
    params.push(region);
  }
  sql += ' )';
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// Doctors WITHOUT a hospital
app.get('/api/doctors/without-hospital', (req, res) => {
  const { region } = req.query;
  let sql = `
    SELECT d.* FROM doctors d
    WHERE (d.hospital IS NULL OR d.hospital = '')
  `;
  const params = [];
  if (region) {
    sql += ' AND LOWER(d.region) = LOWER(?)';
    params.push(region);
  }
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});