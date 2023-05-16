const express = require('express');
const cors = require('cors')
const path = require('path');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();

//import routes
const adsRoutes = require('./routes/ads.routes.js');
const authRoutes = require('./routes/auth.routes.js');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api', adsRoutes);
app.use('/auth', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = `mongodb+srv://dawparc:${process.env.DB_PASS}@newwave.potewil.mongodb.net/AdsBoardDB?retryWrites=true&w=majority`;
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/AdsBoardDBTest';
else dbUri = 'mongodb://localhost:27017/AdsBoardDB';

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

module.exports = server;
