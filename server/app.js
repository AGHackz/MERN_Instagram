const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Config = require('./config.js');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

const app = express();

app.use(morgan("dev"));
app.use(express.static('/public'));

app.use(bodyParser.json());

mongoose.connect(Config.MONGO_URI, { useNewUrlParser: true});

mongoose.connection.on('error', (err) => {
    console.log(`Problem in MongoDB connection ${err}`);
})

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully!');
})

app.use('/', authRoutes);
app.use('/', postRoutes);

app.listen(Config.SERVER_PORT, () => {
    console.log(`Server is running on port ${Config.SERVER_PORT}`);
})