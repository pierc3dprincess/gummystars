const express = require('express');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS, etc.)
app.use(express.static('public'));

// Route for the home page (can be the entry point of your app)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
