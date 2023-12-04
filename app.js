const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON and url-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Contact.html'));
});

// Database connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // Adjust the limit based on your requirements
    host: 'localhost',
    user: 'root',
    password: 'HrishiM$943',
    database: 'elearn',
});

// Handle form submissions
// Handle form submissions
app.post('/process_contact_form', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Use the connection pool for handling database connections
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection:', err.message);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
        }

        // SQL query to insert data into the table
        const sql = 'INSERT INTO contact_form (name, email, phone, message) VALUES (?, ?, ?, ?)';

        // Use parameterized queries to prevent SQL injection
        connection.query(sql, [name, email, phone, message], (err, results) => {
            connection.release(); // Release the connection back to the pool

            if (err) {
                console.error('Error executing SQL query:', err.message);
                res.status(500).json({ success: false, message: 'Internal Server Error' });
                return;
            }

            console.log('Form data submitted successfully!');
            // Redirect to Contact.html after successful form submission
            res.json({ success: true, message: 'Thanks! We will contact you soon.', redirect: '/Contact.html' });
        });
    });
});

// Start the server
const server = app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

// Handle server shutdown
process.on('SIGINT', () => {
    console.log('Server is shutting down...');
    server.close(() => {
        console.log('Server closed.');

        // Optionally, close the database connection pool gracefully here
        pool.end(() => {
            console.log('Database connection pool closed.');
            process.exit(0);
        });
    });
});
