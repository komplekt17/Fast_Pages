const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const yenv = require('yenv');
const env = yenv('env.yaml', { env: 'development' });

const app = express();
const port = env.NODE_PORT;

app.use(cors());
app.use(express.json());

if (env.TYPE_ENV === 'production') {
	// Exprees will serve up production assets
	app.use(express.static('client/build'));
}

const uri = env.HOSTING_URI;

// подключение mongoose к БД
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log(`MongoDB connected successfully`))
	.catch(err => console.error('Could not connect to MongoDB...'));

const pagesRouter = require('./routes/pages-router');
const usersRouter = require('./routes/users-router');
const categoriesRouter = require('./routes/categories-router');

app.use('/pages', pagesRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
