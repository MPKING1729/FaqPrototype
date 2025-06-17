// routes/faqRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all issues
router.get('/issues', (req, res) => {
  db.all('SELECT * FROM issues', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get subissues for issue
router.get('/issues/:id/subissues', (req, res) => {
  const { id } = req.params;
  db.all('SELECT * FROM subissues WHERE issue_id = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get solution for subissue
router.get('/subissues/:id/solutions', (req, res) => {
  const { id } = req.params;
  db.all('SELECT * FROM solutions WHERE subissue_id = ? ORDER BY step_number', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
