const db = require('./db');

const issueId = db.prepare('INSERT INTO issues (title) VALUES (?)').run('MKCL ERA Issue').lastInsertRowid;
const subId = db.prepare('INSERT INTO subissues (issue_id, title) VALUES (?, ?)').run(issueId, 'Client').lastInsertRowid;
const verId = db.prepare('INSERT INTO versions (subissue_id, title) VALUES (?, ?)').run(subId, 'ERA 3.0').lastInsertRowid;

db.prepare(`
  INSERT INTO solutions (version_id, solution_text, screenshot_url, link_url)
  VALUES (?, ?, ?, ?)
`).run(verId, 'Step 1: Do this\nStep 2: Do that.', 'https://example.com/image.jpg', 'https://example.com/doc.pdf');

console.log('Sample data inserted!');
