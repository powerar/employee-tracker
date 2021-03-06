const db = require('./config/connection');
const express = require('express');
const tracker = require('./lib/app.js');

const PORT = process.env.port || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}!`);
    });
});

tracker();