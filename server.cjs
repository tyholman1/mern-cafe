require("dotenv").config()
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const ensureLoggedIn = require('./config/ensureLoggedIn.cjs')

//connect to database
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

// const db = mongoose.connection;

// db.on('connected', function () {
//   console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
// });


const app = express();

// Middleware
//  logger middleware to log requests
app.use(logger('dev'));
// middleware to parse incoming JSON data
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'dist')));

//middleware needs to be above the route
//Check token Middleware

app.use(require('./config/checkToken.cjs'))

// Put API routes here, before the "catch all" route
app.get('/test', (req, res) => {
  res.send('You just hit a API route');
});

const userRouter = require("./routes/api/users.cjs")
// Put API routes here, before the "catch all" route
app.use('/api/users', userRouter);

app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders.cjs'))

app.use('/api/items', ensureLoggedIn, require('./routes/api/item.cjs'))
// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
// Send the built and compiled React code to the browser

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});