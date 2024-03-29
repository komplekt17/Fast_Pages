import { Router } from 'express';

import { Categorie } from '../models';

export const categoriesRouter = Router();

// получение всех categories от всех юзеров
categoriesRouter.get('/', (req, res) => {
	Categorie.find()
		.then((categories) => {
			return res.status(200).json({
				success: true,
				data: categories,
			});
		})
		.catch((error) => {
			res.status(400).json({
				error,
				message: 'Categories not found!',
			});
		});
});

// получение categories по id юзера
categoriesRouter.get('/:id', (req, res) => {
	Categorie.find({ userId: req.params.id })
		.then((categories) => {
			return res.status(200).json({
				success: true,
				data: categories,
			});
		})
		.catch((error) => {
			res.status(400).json({
				error,
				message: 'Categorie not found!',
			});
		});
});

// добавление новой categorie
categoriesRouter.post('/add', (req, res) => {
	const catName = req.body.catName;
	const catClass = req.body.catClass;
	const catColor = req.body.catColor;
	const catBGC = req.body.catBGC;
	const userId = req.body.userId;

	const newCategorie = new Categorie({
		catName,
		catClass,
		catColor,
		catBGC,
		userId,
	});
	//console.log('string 60: ', newCategorie)

	newCategorie
		.save()
		.then(() => {
			return res.status(200).json({
				success: true,
				data: newCategorie,
				message: 'New Categorie was created successful!',
			});
		})
		.catch((error) => {
			return res.status(400).json({
				error,
				message: 'Categorie not created!',
			});
		});
});

// обновление categorie
categoriesRouter.put('/update/:id', (req, res) => {
	//console.log(req.body)
	Categorie.findOne({ _id: req.params.id }, (error, categorie) => {
		if (error) {
			return res.status(404).json({
				error,
				message: 'Categorie not found!',
			});
		}

		categorie.catName = req.body.catName;
		categorie.catClass = req.body.catClass;
		categorie.catColor = req.body.catColor;
		categorie.catBGC = req.body.catBGC;
		categorie.userId = req.body.userId;

		categorie
			.save()
			.then(() => {
				return res.status(200).json({
					success: true,
					data: categorie,
					message: 'This categorie was updated successful!',
				});
			})
			.catch((error) => {
				return res.status(400).json({
					error,
					message: 'Categorie not updated!',
				});
			});
	});
});
