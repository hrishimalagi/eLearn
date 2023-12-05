E-Learn Web Application
E-Learn is a web application designed for online learning, offering features such as courses, a contact form, and user authentication.

Features
Navigation
The application features a navigation bar with links to essential sections, including Home, Courses, About, Contact, and Login pages.

Contact Form
E-Learn includes a Contact page with a user-friendly form that enables users to submit their details and messages easily.

Login Page
The Login page provides a secure form for users to enter their credentials, allowing for authentication and personalized user experiences.

Bootstrap Integration
To ensure a responsive and modern design, the application integrates Bootstrap 5, a popular front-end framework.

Prerequisites
Ensure the following software is installed before running the application:

Node.js
npm (Node Package Manager)
MySQL (for server-side data storage)
Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/your-username/e-learn-web-app.git

Install Dependencies:
cd e-learn-web-app
npm install

Set up MySQL Database:

Create a database named elearn.
Adjust database connection details in the server-side code (app.js).

Run the following code for creating a database:-

-- Create the database
CREATE DATABASE IF NOT EXISTS elearn;

-- Use the database
USE elearn;

-- Create the contact_form table
CREATE TABLE IF NOT EXISTS contact_form (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
phone INT(20) NOT NULL,
message TEXT NOT NULL
);




Usage
Start the Server:
npm start
The server will be accessible at http://localhost:3000.

Server-Side
The server-side code is built using Node.js and Express.
It manages contact form submissions and login authentication.
MySQL is employed for secure data storage.
Client-Side
The client-side utilizes HTML, CSS, and JavaScript.
Bootstrap 5 is seamlessly integrated to enhance styling and responsiveness.
Basic client-side validation is implemented for the login form.
Contributing
Contributions are encouraged! Follow these steps to contribute:

Fork the repository.
Create a new branch.
Make your changes.
Submit a pull request.