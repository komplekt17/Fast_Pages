const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connect atlass cluster0-gtmtp.gcp.mongodb.net 
// const uri = process.env.ATLAS_URI; // use pass aton99
const uri = process.env.LOCAL_URI;

// подключение mongoose к БД 
mongoose.connect(
	uri, 
	{ useNewUrlParser: true, useCreateIndex: true }
); 

const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`MongoDB started successfully from ${uri}`);
})

const pagesRouter = require('./routes/pages-router');
const usersRouter = require('./routes/users-router');
const categoriesRouter = require('./routes/categories-router');

app.use('/pages', pagesRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
