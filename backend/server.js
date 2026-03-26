const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./database');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Pre-create uploads dir
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Routes
// 1. Get all employees
app.get('/api/employees', (req, res) => {
  db.all('SELECT * FROM employees', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 2. Get employee by ID
app.get('/api/employees/:id', (req, res) => {
  db.get('SELECT * FROM employees WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// 3. Create new employee
app.post('/api/employees', upload.single('profilePic'), (req, res) => {
  const { name, email, role, status, remote } = req.body;
  const profilePic = req.file ? req.file.filename : null;
  
  db.run('INSERT INTO employees (name, email, role, status, remote, profilePic) VALUES (?, ?, ?, ?, ?, ?)',
    [name, email, role, status, remote ? 1 : 0, profilePic],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// 4. Update employee
app.put('/api/employees/:id', upload.single('profilePic'), (req, res) => {
  const { name, email, role, status, remote } = req.body;
  const profilePic = req.file ? req.file.filename : undefined;
  
  let query, params;
  if (profilePic !== undefined) {
    query = 'UPDATE employees SET name=?, email=?, role=?, status=?, remote=?, profilePic=? WHERE id=?';
    params = [name, email, role, status, remote ? 1 : 0, profilePic, req.params.id];
  } else {
    query = 'UPDATE employees SET name=?, email=?, role=?, status=?, remote=? WHERE id=?';
    params = [name, email, role, status, remote ? 1 : 0, req.params.id];
  }

  db.run(query, params, function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// 5. Delete employee
app.delete('/api/employees/:id', (req, res) => {
  db.run('DELETE FROM employees WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// 6. Config file download
app.get('/api/download-report', (req, res) => {
  const reportContent = "Employee System Report\nGenerated at: " + new Date().toISOString();
  const filePath = path.join(__dirname, 'uploads', 'report.txt');
  fs.writeFileSync(filePath, reportContent);
  res.download(filePath);
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
