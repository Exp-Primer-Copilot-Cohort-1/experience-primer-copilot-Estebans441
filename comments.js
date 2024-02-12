// Create a web server
const express = require('express');
const app = express();
const port = 3000;

// Create a route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
