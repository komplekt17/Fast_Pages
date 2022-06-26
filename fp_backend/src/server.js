import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { pagesRouter, usersRouter, categoriesRouter } from './routes';
import { TYPE_ENV, PORT_SERVICE_API, DB_URI, API_PATH } from './constants';

// libs screenshots by js
// https://www.google.com/search?newwindow=1&rlz=1C1CHBD_ruRU786RU787&sxsrf=ACYBGNQE8qdNiJCuTgAFumJq8w06ylBlag%3A1578772170682&ei=yiYaXtmnKaSurgTe1JbQCA&q=js+screenshot+by+link&oq=js+screenshot+by+link&gs_l=psy-ab.12...353086.357372..359879...0.2..0.190.1297.0j8......0....1..gws-wiz.......0i71j0i67j0j0i22i30j33i22i29i30j33i160.tMHI-f83yV4&ved=0ahUKEwjZtKjTqPzmAhUkl4sKHV6qBYoQ4dUDCAs

const app = express();

app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// if (TYPE_ENV === 'production') {
// 	// Express will serve up production assets
// 	app.use(express.static('client/build'));
// 	console.log(`Docker with IP 192.168.99.100`);
// }

// подключение mongoose к БД
mongoose
	.connect(DB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log(`MongoDB connected successfully`))
	.catch((err) =>
		console.error(`${err}: Could not connect to MongoDB...`)
	);

app.use(`/${API_PATH}/pages`, pagesRouter);
app.use(`/${API_PATH}/users`, usersRouter);
app.use(`/${API_PATH}/categories`, categoriesRouter);

app.listen(PORT_SERVICE_API, () => {
	console.log(`Server is running on port: ${PORT_SERVICE_API}`);
});
