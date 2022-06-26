import { Router } from 'express';

import { Page } from '../models';
import { getScreenShot, getOgData } from '../utilities';

export const pagesRouter = Router();

// получение всех pages от всех юзеров
pagesRouter.get('/', (req, res) => {
	Page.find()
		.then((pages) => {
			return res.status(200).json({
				success: true,
				data: pages,
			});
		})
		.catch((error) => {
			res.status(400).json({
				error,
				message: 'Pages not found!',
			});
		});
});

// добавление новой page
pagesRouter.post('/add', async (req, res) => {
	// getScreenShot(req, res);
	const OgData = await getOgData(req.body.linkPage);
	// console.log(OgData);

	let imageURL =
		'http://www.skart-info.ru/myProjects/img-fast-pages/imgProcessing.gif';

	if (OgData.ogImage) imageURL = OgData.ogImage.url;

	const newPage = new Page({
		name: req.body.namePage,
		link: req.body.linkPage,
		ctgrId: req.body.ctgrIdPage,
		ctgrClass: req.body.ctgrClass,
		ctgrColor: req.body.ctgrColor,
		ctgrBGC: req.body.ctgrBGC,
		userId: req.body.userId,
		screen: imageURL,
		orderNum: req.body.orderNum,
	});

	newPage
		.save()
		.then(() => {
			return res.status(200).json({
				success: true,
				data: newPage,
				message: 'New Page was created successful!',
			});
		})
		.catch((error) => {
			return res.status(400).json({
				error,
				message: 'Page not created!',
			});
		});
});

// обновление page
pagesRouter.put('/update/:id', (req, res) => {
	Page.findOne({ _id: req.params.id }, (error, page) => {
		if (error) {
			return res.status(404).json({
				error,
				message: 'Page not found!',
			});
		}
		page.name = req.body.name;
		page.link = req.body.link;
		page.ctgrId = req.body.ctgrId;
		page.ctgrClass = req.body.ctgrClass;
		page.ctgrColor = req.body.ctgrColor;
		page.ctgrBGC = req.body.ctgrBGC;
		page.userId = req.body.userId;
		page.screen = req.body.screen;
		page.orderNum = req.body.orderNum;

		page
			.save()
			.then(() => {
				return res.status(200).json({
					success: true,
					data: page,
					message: 'This page was updated successful!',
				});
			})
			.catch((error) => {
				console.log(error);
				return res.status(400).json({
					error,
					message: 'Page not updated!',
				});
			});
	});
});

// удаление page
pagesRouter.delete('/remove/:id', (req, res) => {
	//console.log('req.params.idx', req.params.id)
	Page.findOneAndDelete({ _id: req.params.id }, (error, page) => {
		//console.log('page',page)
		if (!page) {
			return res.status(405).json({
				success: false,
				massage: 'Page not found',
			});
		}
		return res.status(200).json({
			success: true,
			data: page,
			message: 'This page was removed successful!',
		});
	}).catch((error) => {
		res.status(400).json({
			error,
			message: 'Page not deleted!',
		});
	});
});
