const router = require('express').Router();
let Page = require('../models/pages-model');

// получение всех pages от всех юзеров
router.route('/').get((req, res) => {
  Page.find()
    .then((pages) => {
      return res.status(200).json({
        success: true,
        data: pages
      })
    })
    .catch(error => {
      res.status(400).json({
        error,
        message: 'Page not found!'
      })
    });
});

// получение pages по id юзера
router.route('/:id').get((req, res) => {
  Page.find({userId: req.params.id})
    .then((pages) => {
      return res.status(200).json({
        success: true,
        data: pages
      })
    })
    .catch(error => {
      res.status(400).json({
        error,
        message: 'Page not found!'
      })
    });
});

// добавление новой page
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const link = req.body.link;
  const ctgrId = req.body.ctgrId;
  const userId = req.body.userId;
  const screen = req.body.screen;

  const newPage = new Page({
    name,
    link,
    ctgrId,
    userId,
    screen
  });

  newPage.save()
  .then(() => res.json('Page added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// выборка page по своему ID
router.route('/:id').get((req, res) => {
  Page.findById(req.params.id)
    .then(page => res.json(page))
    .catch(err => res.status(400).json('Error: ' + err));
});

// удаление page по своему ID 
router.route('/:id').delete((req, res) => {
  Page.findByIdAndDelete(req.params.id)
    .then(() => res.json('Page deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// обновление page
router.route('/update/:id').post((req, res) => {
  Page.findById(req.params.id)
    .then(page => {
      page.name = req.body.name;
      page.description = req.body.description;
      page.duration = Number(req.body.duration);
      page.date = Date.parse(req.body.date);

      page.save()
        .then(() => res.json('Page updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;