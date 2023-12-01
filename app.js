const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Database connection details
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your actual database username
    password: 'HrishiM$943', // Replace with your actual database password
    database: 'elearn', // Replace with your actual database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Middleware to parse JSON and url-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Contact.html');
});


// Handle form submissions
app.post('/process_contact_form', (req, res) => {
    const { name, email, phone, message } = req.body;

    // SQL query to insert data into the table
    const sql = "INSERT INTO contact_form (name, email, phone, message) VALUES (?, ?, ?, ?)";

    // Execute the query with parameterized values to prevent SQL injection
    db.query(sql, [name, email, phone, message], (err) => {
        if (err) {
            console.error('Error executing SQL query: ' + err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('Form data submitted successfully!');
        res.send('<script>alert("Thanks! We will contact you soon"); window.location.href="/";</script>');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
