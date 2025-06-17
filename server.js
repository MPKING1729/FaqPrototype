const express = require('express');
const cors = require('cors');
const db = require('./db');


const app = express();
app.use(cors());
app.use(express.json());

const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Get all issues
app.get('/issues', (req, res) => {
  db.query('SELECT id, name FROM issues', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get subissues for an issue
app.get('/subissues/:issueId', (req, res) => {
  const issueId = req.params.issueId;
  db.query('SELECT id, name FROM subissues WHERE issue_id = ?', [issueId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get versions for a subissue
app.get('/versions/:subissueId', (req, res) => {
  const subissueId = req.params.subissueId;
  db.query('SELECT id, name FROM versions WHERE subissue_id = ?', [subissueId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get solution for a version
app.get('/solution/:versionId', (req, res) => {
  const versionId = req.params.versionId;
  db.query('SELECT text, image, link FROM solutions WHERE version_id = ?', [versionId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});