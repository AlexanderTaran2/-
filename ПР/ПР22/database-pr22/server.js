const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'SERVER WORKS' });
});

app.listen(3000, () => {
    console.log('Server: http://localhost:3000');
});