// server.js
const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3000;

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'db_password',
    database: 'library'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// API endpoint to fetch books data
app.get('/api/books', (req, res) => {
    const sql = 'SELECT BookId, ISBN, Title, Category, Edition FROM Books';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
