const db = require('./db/connection');
const express = require('express');
const tracker = require('./lib/app.js');


const PORT = process.env.port || 3001;

const app = express();

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}!`);
    });
});

tracker();