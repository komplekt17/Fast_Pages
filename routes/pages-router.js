const router = require('express').Router();
let Page = require('../models/pages-model');
const getScreenShot = require('../screenshot');

// получение всех pages от всех юзеров
router.route('/').get((req, res) => {
	Page.find()
		.then(pages => {
			return res.status(200).json({
				success: true,
				data: pages
			});
		})
		.catch(error => {
			res.status(400).json({
				error,
				message: 'Pages not found!'
			});
		});
});

// добавление новой page
router.route('/add').post((req, res) => {
	getScreenShot(req, res);
});

// обновление page
router.route('/update/:id').put((req, res) => {
	Page.findOne({ _id: req.params.id }, (error, page) => {
		if (error) {
			return res.status(404).json({
				error,
				message: 'Page not found!'
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
					message: 'This page was updated successful!'
				});
			})
			.catch(error => {
				console.log(error);
				return res.status(400).json({
					error,
					message: 'Page not updated!'
				});
			});
	});
});

// удаление page
router.route('/remove/:id').delete((req, res) => {
	//console.log('req.params.idx', req.params.id)
	Page.findOneAndDelete({ _id: req.params.id }, (error, page) => {
		//console.log('page',page)
		if (!page) {
			return res.status(405).json({
				success: false,
				massage: 'Page not found'
			});
		}
		return res.status(200).json({
			success: true,
			data: page,
			message: 'This page was removed successful!'
		});
	}).catch(error => {
		res.status(400).json({
			error,
			message: 'Page not deleted!'
		});
	});
});

module.exports = router;
