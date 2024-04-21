const express = require('express');
const router = require('./router');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(router);

module.exports = app;
