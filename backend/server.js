const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));
}

  // Express serve up index.html file if it doesn't recognize route
  // const path = require('path');
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });

const uri = process.env.ATLAS_URI;
// const uri = process.env.LOCAL_URI;
// const uri = process.env.MLAB_URI;

// подключение mongoose к БД 
mongoose
  .connect(
  	uri, 
  	{ 
  		useNewUrlParser: true, 
  		useCreateIndex: true, 
  		useUnifiedTopology: true 
  	}
  )
  .then(() => console.log(`MongoDB started successfully from ${uri}`))
  .catch(err => console.error("Could not connect to MongoDB...")); 

// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log(`MongoDB started successfully from ${uri}`);
// })

const pagesRouter = require('./routes/pages-router');
const usersRouter = require('./routes/users-router');
const categoriesRouter = require('./routes/categories-router');

app.use('/pages', pagesRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
