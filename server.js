const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const yenv = require('yenv');
const env = yenv('env.yaml', { env: 'development' });

// libs screenshots by js
// https://www.google.com/search?newwindow=1&rlz=1C1CHBD_ruRU786RU787&sxsrf=ACYBGNQE8qdNiJCuTgAFumJq8w06ylBlag%3A1578772170682&ei=yiYaXtmnKaSurgTe1JbQCA&q=js+screenshot+by+link&oq=js+screenshot+by+link&gs_l=psy-ab.12...353086.357372..359879...0.2..0.190.1297.0j8......0....1..gws-wiz.......0i71j0i67j0j0i22i30j33i22i29i30j33i160.tMHI-f83yV4&ved=0ahUKEwjZtKjTqPzmAhUkl4sKHV6qBYoQ4dUDCAs

const app = express();
const port = env.NODE_PORT;

app.use(cors());
app.use(express.json());

if (env.TYPE_ENV === 'production') {
	// Exprees will serve up production assets
	app.use(express.static('client/build'));
}

const uri = env.HOSTING_URI;
// const uri = env.LOCAL_URI;

// подключение mongoose к БД
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log(`MongoDB connected successfully`))
	.catch(err => console.error(`${err}: Could not connect to MongoDB...`));

const pagesRouter = require('./routes/pages-router');
const usersRouter = require('./routes/users-router');
const categoriesRouter = require('./routes/categories-router');

app.use('/pages', pagesRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
