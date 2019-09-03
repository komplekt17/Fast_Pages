const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//const uri = process.env.ATLAS_URI;
const uri = process.env.LOCAL_URI;

// подключение mongoose к БД 
mongoose.connect(
	uri, 
	{ useNewUrlParser: true, useCreateIndex: true }
); 

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises-router');
const usersRouter = require('./routes/users-router');
const movieRouter = require('./routes/movies-router');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/movie', movieRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
