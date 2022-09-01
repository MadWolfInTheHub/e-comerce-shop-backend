require('./startup/db')();
const winston = require('winston');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const customers = require('./routes/customers');
const items = require('./routes/items');
const orders = require('./routes/orders');

app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/items', items);
app.use('/api/orders', orders);

const port = process.env.Port || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;
