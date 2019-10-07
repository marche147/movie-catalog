const mongoose = require('mongoose');
const express = require('express');
const API_PORT = 5000;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://you_cao:22ohyeah@movie-catalog-9wta9.mongodb.net/admin?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});