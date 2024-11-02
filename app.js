// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
require('dotenv').config(); 
const infoRoutes = require('./routes/info');
const ageRoutes = require('./routes/age');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(bodyParser.json());

app.use('/info', infoRoutes);
app.use('/age', ageRoutes);
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
