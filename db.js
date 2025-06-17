const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // 👈 your MySQL username (default is root)
  password: 'server',        // 👈 your MySQL password (set it if you added one)
  database: 'faq_system'    // 👈 change this to your database name
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL Database ✅');
});

module.exports = connection;
