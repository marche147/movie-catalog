const mongoose = require('mongoose');
const express = require('express');
const API_PORT = 5000;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = 'mongodb+srv://you_cao:22ohyeah@movie-catalog-9wta9.mongodb.net/movies?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;
let Schema = mongoose.Schema;

/* Movie info schema */
// XXX: Data inside db contain errors... fields are mistaken for some entries...
let movieInfoSchema = new Schema({
  title: String,
  cast: String,
  certificate: String,
  director: String,
  genre: String,
  img_url: String,
  plot: String,
  release_data: String,
  runtime: String,
});
let MovieInfo = db.model('MovieInfo', movieInfoSchema, 'MovieInfo');

/* Review Info schema */
let reviewSchema = new Schema({
  review_title: String,
  review_content: String,
  title: String,
  website: String
});
let Review = db.model('Review', reviewSchema, 'Reviews');

let reviewsaSchema = new Schema({
  review_title: String,
  review_content: String,
  score: String,
  title: String,
  website: String,
});
let ReviewsSA = db.model('ReviewsSA', reviewsaSchema, 'ReviewsSA');

/* Top Movie schema */
let topMovieSchema = new Schema({
  title: String,
  rt_audience_rate: String,
  rt_count: String,
  rt_rank: String,
  rt_rate: String,
  imdb_rank: String,
  imbd_rate: String,
  release_date: String,
});
let TopMovie = db.model('TopMovie', topMovieSchema, 'TopMovies');

db.once('open', () => {
  console.log('connected to the database');
});

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

/* Movie info query */
app.get('/list', async (req, res) => {
  let data = await MovieInfo.find().lean();
  res.send(JSON.stringify(data));
});

/* Review query */
app.get('/review', async (req, res) => {
  let data = await ReviewsSA.find().lean();
  res.send(JSON.stringify(data));
});

/* Top movie query */
app.get('/top', async (req, res) => {
  let data = await TopMovie.find().lean();
  res.send(JSON.stringify(data));
});

