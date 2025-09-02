const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const db = mysql.createConnection({
  host: 'database-1.cdop00d6ipj9.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Sameer%00',
  database: 'database_1'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

app.post('/register', (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [first_name, last_name, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting:', err);
      return res.send('Error saving data');
 }
    console.log('User added:', result.insertId);
    res.send('Registration successful!');
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Incoming:', username, password);

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [username.trim(), password.trim()], (err, results) => {
    if (err) {
      console.error('Error checking login:', err);
      return res.send('Error during login');
    }

    console.log('Query results:', results);

    if (results.length > 0) {
      res.redirect('/final interface.html');
    } else {
      res.send('Invalid username or password');
    }
  });
});
app.listen(port, '0.0.0.0', () => {
  console.log(Server running at http://0.0.0.0:${port});
});