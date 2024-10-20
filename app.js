const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Added to handle JSON requests

// Serve static files
app.use(express.static('public'));

// Route to serve the account page
app.get('/account', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'account.html'));
});

// Function to read users from users.json
const readUsers = () => {
    try {
        const data = fs.readFileSync('./users.json', 'utf8');
        return data ? JSON.parse(data) : []; // Return an empty array if the data is empty
    } catch (error) {
        console.error('Error reading users:', error);
        return []; // Return an empty array if there's an error
    }
};

// Function to write users to users.json
const writeUsers = (users) => {
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
};

// Handle signup
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const users = readUsers();

    // Check if the user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).send('User already exists!'); // Send error message
    }

    users.push({ username, email, password }); // Store user in the JSON file
    writeUsers(users); // Save updated users list
    res.send('User registered successfully!'); // Send a success message
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.send('Login successful!'); // Send a success message
    } else {
        res.status(401).send('Invalid credentials!'); // Send an error message
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
